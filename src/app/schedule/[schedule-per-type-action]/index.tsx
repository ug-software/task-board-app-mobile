import { Typograph, TextField, SelectField, Option, DatePicker } from "@/src/components";
import { View, Text } from "react-native";
import React, { useState } from "react";
import { styleSheetPageSchedule, styleStatusOption } from "./styles";
import { status } from "@/src/constants";

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

    return(
        <View style={styles.whapperPageTaskPerAction}>
            <Typograph pb={20} pt={10} fontWeight={"500"} variant="h3">Adicionar Tarefa:</Typograph>
            <View style={styles.containerTextField}>
                <TextField 
                    fullWidth 
                    name="name" 
                    variant="filed" 
                    label="Nome da tarefa:*"
                    //value={values.name}
                    //onChangeText={(text) => handleChange({ name: "name", value: text })}
                    //error={Boolean(errors?.name)}
                    //helperText={errors?.name}
                />
            </View>
            <View style={styles.containerTextField}>
                <DatePicker 
                    fullWidth 
                    name="date" 
                    label="Data:*"
                    //value={values.name}
                    //onChangeText={(text) => handleChange({ name: "name", value: text })}
                    //error={Boolean(errors?.name)}
                    //helperText={errors?.name}
                />
            </View>
            <View style={styles.containerTextField}>
                <SelectField 
                    fullWidth 
                    name="status" 
                    label="Status:*"
                    //value={values.name}
                    //onChangeText={(text) => setStatus(text)}
                    //error={Boolean(errors?.name)}
                    //helperText={errors?.name}
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
                    //value={values.name}
                    //onChangeText={(text) => handleChange({ name: "name", value: text })}
                    //error={Boolean(errors?.name)}
                    //helperText={errors?.name}
                    >
                    <Option value="texto selecionado">
                        <Text>Olá o texto selecionado</Text>
                    </Option>
                    <Option value="texto selecionado 2">
                        <Text>Olá o texto selecionado 2</Text>
                    </Option>
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
                    //value={values.name}
                    //onChangeText={(text) => handleChange({ name: "name", value: text })}
                    //error={Boolean(errors?.name)}
                    //helperText={errors?.name}
                />
            </View>
        </View>
    );
}