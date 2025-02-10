import React, { useState } from "react";
import { TextFieldBase } from "../text-field";
import styleSheetTimePicker from "./styles";
import { Modal, Pressable, View, Text, GestureResponderEvent } from "react-native";
import Svg, { Circle, Text as SvgText, G } from "react-native-svg";
import { useTheme } from "@/src/hooks";
import Button from "../button";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const size = 300;
const strokeWidth = 15;
const labelsHours = {
    8: {
        label: "12"
    },
    9: {
        label: "1"
    },
    10: {
        label: "2"
    },
    11: {
        label: "3"
    },
    0: {
        label: "4"
    },
    1: {
        label: "5"
    },
    2: {
        label: "6"
    },
    3: {
        label: "7"
    },
    4: {
        label: "8"
    },
    5: {
        label: "9"
    },
    6: {
        label: "10"
    },
    7: {
        label: "11"
    },
};
const labelsMinutes = {
    8: {
        label: "00"
    },
    9: {
        label: "05"
    },
    10: {
        label: "10"
    },
    11: {
        label: "15"
    },
    0: {
        label: "20"
    },
    1: {
        label: "25"
    },
    2: {
        label: "30"
    },
    3: {
        label: "35"
    },
    4: {
        label: "40"
    },
    5: {
        label: "45"
    },
    6: {
        label: "50"
    },
    7: {
        label: "55"
    },
};

export interface TimePicker {
    hour: string,
    minutes: string,
    type: string
}

export interface TimePickerProps extends Omit<TextFieldBase, "value" | "onChange"> {
    value: TimePicker
    onChange: (value: TimePicker) => void
}

export default ({ error = false, name, value, ...rest} : TimePickerProps) => {
    const theme = useTheme();
    const [isActive, setActive] = useState(false);
    const styles = styleSheetTimePicker({ active: isActive, name, error, ...rest });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [time, setTime] = useState<TimePicker>(value ? value : {
        hour: "1",
        minutes: "00",
        type: "AM"
    });

    const handleSelect = (value: TimePicker) => {
        setActive(state => !state);
        setModalVisible(state => !state);

        if(rest.onChange){
            rest.onChange(value);
        }
    };

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

    const handleSelectTypeTime = () => {
        if(time.type === "AM"){
            setTime(state => ({...state, type: "PM"}));
        }else {
            setTime(state => ({...state, type: "AM"}));
        }
    }

    return(
        <View>
            <Pressable onPress={handleFocus} style={[styles.whapperTextFieldFiled, rest.style]}>
                <Text style={styles.labelTextFieldFiled}>{rest.label}</Text>
                <Text>{value?.hour}:{value?.minutes} - {value?.type}</Text>
            </Pressable>
            {error && (<Text style={styles.helperText}>{rest.helperText}</Text>)}
            <Modal visible={modalVisible} transparent animationType="fade">
                <Pressable style={styles.whapperModal} onPress={handleBlur}>
                    <View style={styles.containerModal}>
                        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                            {
                                HOURS.map((hour, index) => {
                                    {/* Barra de progresso animada */}
                                    const angle = ((index + 1) * 30 * Math.PI) / 180;
                                    const positionHour = {
                                        x: (size / 2) + Math.cos(angle) * ((size - 38) / 2),
                                        y: ((size + 5)/ 2) + Math.sin(angle) * ((size  - 38) / 2)
                                    };
                                    const positionMinutes = {
                                        x: (size / 2) + Math.cos(angle) * ((size - 108) / 2),
                                        y: ((size + 5)/ 2) + Math.sin(angle) * ((size  - 108) / 2)
                                    }

                                    //@ts-ignore
                                    const labelHour = labelsHours[index].label;
                                    //@ts-ignore
                                    const labelMinutes = labelsMinutes[index].label;

                                    const isSelectedHour = labelHour === time.hour;
                                    const isSelectedMinutes = labelMinutes === time.minutes;                  
                                    return(
                                        <>
                                            {/* HORAS */}
                                            <G key={index} onPress={() => setTime(state => ({ ...state, hour: labelHour }))}>
                                                <Circle
                                                    x={positionHour.x}
                                                    y={positionHour.y - 5}
                                                    r={strokeWidth}
                                                    stroke={theme.primary.primary}
                                                    strokeWidth={isSelectedHour ? 3 : 0}
                                                    fill={isSelectedHour ? theme.primary.primary : "transparent"}
                                                />
                                                <SvgText
                                                    x={positionHour.x}
                                                    y={positionHour.y}
                                                    textAnchor="middle"
                                                    fill={isSelectedHour ? theme.primary.background : "black"}
                                                    fontSize={16}
                                                >
                                                    {labelHour}
                                                </SvgText>
                                            </G>

                                            {/* Minutos */}
                                            <G key={index + 90} onPress={() => setTime(state => ({...state, minutes: labelMinutes}))}>
                                                <Circle
                                                    x={positionMinutes.x}
                                                    y={positionMinutes.y - 5}
                                                    r={strokeWidth}
                                                    stroke={theme.primary.primary}
                                                    strokeWidth={isSelectedMinutes ? 3 : 0}
                                                    fill={isSelectedMinutes ? theme.primary.primary : "transparent"}
                                                />
                                                <SvgText
                                                    x={positionMinutes.x}
                                                    y={positionMinutes.y}
                                                    textAnchor="middle"
                                                    fill={isSelectedMinutes ? theme.primary.background : "black"}
                                                    fontSize={16}
                                                >
                                                    {labelMinutes}
                                                </SvgText>
                                            </G>
                                        </>
                                    );
                                })
                            }
                        </Svg>
                        <View style={styles.footerTimePicker}>
                            <Text style={styles.textLabelTime}>{time.hour}:{time.minutes}</Text>
                            <View style={styles.typeTimePicker}>
                                <Pressable onPress={handleSelectTypeTime} style={[styles.typeButtonTimePicker, time.type === "AM" ? styles.typeButtonTimePickerSelected : {}]}>
                                    <Text style={{color: time.type === "AM" ? theme.primary.background : "black" }}>AM</Text>
                                </Pressable>
                                <Pressable onPress={handleSelectTypeTime} style={[styles.typeButtonTimePicker, time.type === "PM" ? styles.typeButtonTimePickerSelected : {}]}>
                                    <Text style={{color: time.type === "PM" ? theme.primary.background : "black" }}>PM</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.action}>
                            <Button size="small" variant="contained" onPress={() => handleSelect(time)}>Selecionar</Button>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}