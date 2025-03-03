import React, { useEffect, useState } from "react";
import { Typograph, TextField, SelectField, Option, DatePicker, Icon, Button, TimerPicker, TimePicker as ITimerPicker } from "@/src/components";
import { View, Text } from "react-native";
import { styleSheetPageSchedule, styleStatusOption, styleProjectOption } from "./styles";
import { icons, status } from "@/src/constants";
import { useForm, useProject, useTasks } from "@/src/hooks";
import Project from "@/src/interfaces/project";
import Tasks from "@/src/interfaces/task";
import { useLocalSearchParams } from "expo-router";

export const ProjectOption = ({ name, icon, color }: Project) => {
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
            <Typograph variant="paragraph" style={styles.labelProjectOption}>{name}</Typograph>
        </View>
    );
}

interface StatusOptionProps {
    label: string;
    color: string
}

export const StatusOption = ({ color, label }: StatusOptionProps) => {
    const styles = styleStatusOption({ color });
    return(
        <View style={styles.whapperOptionStatus}>
            <Typograph variant="paragraph" style={styles.labelOptionStatus}>{label}</Typograph>
        </View>
    );
}

export default () => {
    const styles = styleSheetPageSchedule();
    const params = useLocalSearchParams();
    const { getAllProjects } = useProject();
    const [projectOptions, setProjectOptions] = useState<Project[]>([]);
    const { handleValidationTask, handleSaveNewTask, findTaskPerId, handleUpdateTask } = useTasks();
    const handleSubmitTasks = params['schedule-per-type-action'] === 'edit' ? handleUpdateTask : handleSaveNewTask;
    const title = params['schedule-per-type-action'] === 'edit' ? "Editar Tarefa" : "Adicionar Tarefa";
    
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      setValues
    } = useForm<Partial<Tasks> & { time: ITimerPicker }>({
      initialValues: {
        name: "",
        date_marked: new Date(),
        description: "",
        status: "",
        project_id: undefined,
        time: {
            hour: new Date().getHours().toString(),
            minutes: "00",
        }
      },
      onSubmit: handleSubmitTasks,
      onValidation: handleValidationTask
    });

    useEffect(() => {
        (async () => {
            var projects = await getAllProjects();
            if(projects){
                setProjectOptions(projects);
            }
        })()

        if(params['schedule-per-type-action'] === 'edit'){
            var id = params['id'];
            
            (async () => {
              if(typeof id !== "string") return;
      
              const taskPerId = await findTaskPerId(Number.parseInt(id));
              
              if(taskPerId !== null){
                var task = {
                    ...taskPerId,
                    time: {
                        hour: taskPerId.date_marked.getHours().toString(),
                        minutes: taskPerId.date_marked.getMinutes().toString(),
                    }
                }
                                
                setValues(task);
              }
            })();
          } 
    }, []);

    return(
        <View style={styles.whapperPageTaskPerAction}>
            <View>
                <Typograph pb={20} pt={10} fontWeight={"500"} variant="h3">{title}</Typograph>
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
                        value={values.date_marked}
                        onChangeText={(text) => handleChange({ name: "date_marked", value: text })}
                        error={Boolean(errors?.date_marked)}
                        helperText={errors?.date_marked}
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
                                <Option key={index} value={sts}>
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