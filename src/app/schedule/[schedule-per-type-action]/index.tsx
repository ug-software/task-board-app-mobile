import React, { useEffect, useState } from "react";
import { Typograph, TextField, SelectField, Option, DatePicker, Icon, Button, TimerPicker, TimePicker as ITimerPicker } from "@/src/components";
import { View, Text } from "react-native";
import { styleSheetPageSchedule, styleStatusOption, styleProjectOption } from "./styles";
import { icons, status } from "@/src/constants";
import { useForm, useProject, useTasks } from "@/src/hooks";
import Project from "@/src/interfaces/project";
import Tasks from "@/src/interfaces/task";

const ProjectOption = ({ name, icon, color }: Project) => {
    const styles = styleProjectOption({ color });
    return(
        <View style={styles.whapperProjectOption}>
            <View style={styles.IconProjectOption}>
                <Icon
                    //@ts-ignore 
                    type={icons[icon].package}
                    //@ts-ignore
                    name={icons[icon].name}
                    color={color}
                />
            </View>
            <Text style={styles.labelProjectOption}>{name}</Text>
        </View>
    );
}

interface StatusOptionProps {
    label: string;
    color: string
}

const StatusOption = ({ color, label }: StatusOptionProps) => {
    const styles = styleStatusOption({ color });
    return(
        <View style={styles.whapperOptionStatus}>
            <Text style={styles.labelOptionStatus}>{label}</Text>
        </View>
    );
}

export default () => {
    const styles = styleSheetPageSchedule();
    const { getAllProjects } = useProject();
    const [projectOptions, setProjectOptions] = useState<Project[]>([]);
    const { handleValidationTask, handleSaveNewTask } = useTasks();

    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      setValues
    } = useForm<Partial<Tasks> & { time: ITimerPicker }>({
      initialValues: {
        name: "",
        date: new Date(),
        description: "",
        status: "",
        project_id: undefined,
        time: {
            hour: new Date().getHours().toString(),
            minutes: "00",
        }
      },
      onSubmit: handleSaveNewTask,
      onValidation: handleValidationTask
    });

    useEffect(() => {
        (async () => {
            var projects = await getAllProjects();
            if(projects){
                setProjectOptions(projects);
            }
        })()
    }, []);

    return(
        <View style={styles.whapperPageTaskPerAction}>
            <View>
                <Typograph pb={20} pt={10} fontWeight={"500"} variant="h3">Adicionar Tarefa:</Typograph>
                <View style={styles.containerTextField}>
                    <TextField 
                        fullWidth 
                        name="name" 
                        variant="filed" 
                        label="Nome da tarefa:*"
                        value={values.name}
                        onChangeText={(text) => handleChange({ name: "name", value: text })}
                        error={Boolean(errors?.name)}
                        helperText={errors?.name}
                    />
                </View>
                <View style={styles.containerTextField}>
                    <DatePicker 
                        fullWidth 
                        name="date" 
                        label="Data:*"
                        value={values.date}
                        onChangeText={(text) => handleChange({ name: "date", value: text })}
                        error={Boolean(errors?.date)}
                        helperText={errors?.date}
                    />
                </View>
                <View style={styles.containerTextField}>
                    <TimerPicker 
                        fullWidth 
                        name="hour" 
                        label="Horário:*"
                        value={values.time}
                        //@ts-ignore
                        onChange={(timer) => handleChange({ name: "time", value: timer })}
                        error={Boolean(errors?.time)}
                        helperText={errors?.time}
                    />
                </View>
                <View style={styles.containerTextField}>
                    <SelectField 
                        fullWidth 
                        name="status" 
                        label="Status:*"
                        //@ts-ignore
                        value={values.status ? status[values.status].label : values.status}
                        onChangeText={(text) => handleChange({ name: "status", value: text })}
                        error={Boolean(errors?.status)}
                        helperText={errors?.status}
                    >
                        {
                            Object.keys(status).map((sts, index) => (
                                <Option value={sts}>
                                    <StatusOption
                                        //@ts-ignore
                                        label={status[sts].label}
                                        //@ts-ignore
                                        color={status[sts].color}
                                        key={index}
                                    />
                                </Option>
                            ))
                        }
                    </SelectField>
                </View>
                <View style={styles.containerTextField}>
                    <SelectField
                        fullWidth 
                        name="project_id" 
                        label="Projeto:*"
                        value={projectOptions.find(p => p.id === values.project_id)?.name}
                        onChangeText={(text) => handleChange({ name: "project_id", value: text })}
                        error={Boolean(errors?.project_id)}
                        helperText={errors?.project_id}
                    >
                        {
                            projectOptions.map((project, index) => (
                                <Option value={project.id}>
                                    <ProjectOption key={index} {...project} />
                                </Option>
                            ))
                        }                    
                    </SelectField>
                </View>
                <View style={styles.containerTextField}>
                    <TextField 
                        fullWidth 
                        name="description" 
                        variant="filed" 
                        label="Descrição:*"
                        multiline
                        numberOfLines={8}
                        value={values.description}
                        onChangeText={(text) => handleChange({ name: "description", value: text })}
                        error={Boolean(errors?.description)}
                        helperText={errors?.description}
                    />
                </View>
            </View>
            <Button variant="contained" onPress={handleSubmit}>Salvar</Button>
        </View>
    );
}