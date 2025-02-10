import { Modal, Pressable, View, Text, GestureResponderEvent } from "react-native";
import { useCalendary } from "@/src/hooks";
import Calendary from "../calendary";
import React, { useState } from "react";
import { TextFieldBase } from "../text-field";
import styleSheetDatePicker from "./styles";
import IconButton from "../icon-button";
import Icon from "../icon";
import { mouths } from "@/src/constants/calendary";
import Button from "../button";

export interface DatePickerProps extends Omit<TextFieldBase, "value"> {
    value: Date | undefined
}

export default ({ error = false, name, value, ...rest} : DatePickerProps) => {
    const { calendary, handleChangeCalendary } = useCalendary();
    const [isActive, setActive] = useState(false);
    const styles = styleSheetDatePicker({ ...rest, active: isActive, name, error });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    const handleSelectDate = (value: Date) => {
        setDate(value);
    };
    
    const handleSelect = (value: Date) => {
        setActive(state => !state);
        setModalVisible(state => !state);
    
        if(rest.onChangeText){
            rest.onChangeText(value.toString());
        }
    }

    const handleFocus = () => {
        setActive(state => !state);
        setModalVisible(state => !state);
        if(rest.onFocus){
            //@ts-ignore
            props.onFocus()
        }
    };
    
    const handleBlur = (event: GestureResponderEvent) => {
        event.isPropagationStopped();
        setActive(state => !state);
        setModalVisible(state => !state);
        if(rest.onBlur){
            //@ts-ignore
            props.onBlur()
        }
    };

    return(
        <View>
            <Pressable onPress={handleFocus} style={[styles.whapperTextFieldFiled, rest.style]}>
                <Text style={styles.labelTextFieldFiled}>{rest.label}</Text>
                <Text>{value && new Date(value).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</Text>
            </Pressable>
            {error && (<Text style={styles.helperText}>{rest.helperText}</Text>)}
            <Modal visible={modalVisible} transparent animationType="fade">
                <Pressable style={styles.whapperModal} onPress={handleBlur}>
                    <View style={styles.containerModal}>
                        <View style={styles.headerModal}>
                            <View>
                                <IconButton onPress={() => handleChangeCalendary("left")} variant="outlined">
                                    <Icon 
                                        //@ts-ignore
                                        name="arrow-back-ios-new" 
                                        type="MaterialIcons" 
                                    />
                                </IconButton>
                            </View>
                            <View style={styles.containerInfoCalendary}>
                                <Text style={styles.textMonth}>
                                    {
                                        //@ts-ignore
                                        mouths[calendary.month].full
                                    }
                                </Text>
                                <Text style={styles.textYear}>{calendary.year}</Text>
                            </View>
                            <View>
                                <IconButton onPress={() => handleChangeCalendary("right")} variant="outlined">
                                    <Icon 
                                        //@ts-ignore
                                        name="arrow-forward-ios" 
                                        type="MaterialIcons" 
                                    />
                                </IconButton>
                            </View>
                        </View>
                        <Calendary day={date.getDate()} month={calendary.month} year={calendary.year} onSelectDate={handleSelectDate} />
                        <View style={styles.action}>
                            <Button size="small" variant="contained" onPress={() => handleSelect(date)}>Selecionar</Button>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}