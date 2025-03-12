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
        am: {
            label: "00"
        },
        pm: {
            label: "12"
        },
    },
    9: {
        am: {
            label: "1"
        },
        pm: {
            label: "13"
        },
    },
    10: {
        am: {
            label: "2"
        },
        pm: {
            label: "14"
        },
    },
    11: {
        am: {
            label: "3"
        },
        pm: {
            label: "15"
        },
    },
    0: {
        am: {
            label: "4"
        },
        pm: {
            label: "16"
        },
    },
    1: {
        am: {
            label: "5"
        },
        pm: {
            label: "17"
        },
    },
    2: {
        am: {
            label: "6"
        },
        pm: {
            label: "18"
        },
    },
    3: {
        am: {
            label: "7"
        },
        pm: {
            label: "19"
        },
    },
    4: {
        am: {
            label: "8"
        },
        pm: {
            label: "20"
        },
    },
    5: {
        am: {
            label: "9"
        },
        pm: {
            label: "21"
        },
    },
    6: {
        am: {
            label: "10"
        },
        pm: {
            label: "22"
        },
    },
    7: {
        am: {
            label: "11"
        },
        pm: {
            label: "23"
        },
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
    const [isHourVisible, setIsHourVisible] = useState<boolean>(true);
    const [time, setTime] = useState<TimePicker>(value ? value : {
        hour: "1",
        minutes: "00"
    });

    const handleSelect = (value: TimePicker) => {
        setActive(state => !state);
        setModalVisible(state => !state);
        setIsHourVisible(true);

        if(rest.onChange){
            rest.onChange(value);
        }

        if(rest.onBlur){
            //@ts-ignore
            props.onBlur()
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

    return(
        <View>
            <Pressable onPress={handleFocus} style={[styles.whapperTextFieldFiled, rest.style]}>
                <Text style={styles.labelTextFieldFiled}>{rest.label}</Text>
                <Text>{value?.hour}:{value?.minutes}</Text>
            </Pressable>
            {error && (<Text style={styles.helperText}>{rest.helperText}</Text>)}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.whapperModal}>
                    <View style={styles.containerModal}>
                        {
                            isHourVisible ? (
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
                                            const labelAM = labelsHours[index].am.label;
                                            //@ts-ignore
                                            const labelPM = labelsHours[index].pm.label;

                                            const isSelectedAM = labelAM === time.hour;
                                            const isSelectedPM = labelPM === time.hour;
                                            //const isSelectedMinutes = labelMinutes === time.minutes;                  
                                            return(
                                                <>
                                                    {/* HORAS */}
                                                    <G key={index} onPress={() => setTime(state => ({ ...state, hour: labelAM }))}>
                                                        <Circle
                                                            x={positionHour.x}
                                                            y={positionHour.y - 5}
                                                            r={strokeWidth}
                                                            stroke={theme.primary.primary}
                                                            strokeWidth={isSelectedAM ? 3 : 0}
                                                            fill={isSelectedAM ? theme.primary.primary : "transparent"}
                                                        />
                                                        <SvgText
                                                            x={positionHour.x}
                                                            y={positionHour.y}
                                                            textAnchor="middle"
                                                            fill={isSelectedAM ? theme.primary.background : "black"}
                                                            fontSize={16}
                                                        >
                                                            {labelAM}
                                                        </SvgText>
                                                    </G>

                                                    {/* Minutos */}
                                                    <G key={index + 90} onPress={() => setTime(state => ({...state, hour: labelPM}))}>
                                                        <Circle
                                                            x={positionMinutes.x}
                                                            y={positionMinutes.y - 5}
                                                            r={strokeWidth}
                                                            stroke={theme.primary.primary}
                                                            strokeWidth={isSelectedPM ? 3 : 0}
                                                            fill={isSelectedPM ? theme.primary.primary : "transparent"}
                                                        />
                                                        <SvgText
                                                            x={positionMinutes.x}
                                                            y={positionMinutes.y}
                                                            textAnchor="middle"
                                                            fill={isSelectedPM ? theme.primary.background : "black"}
                                                            fontSize={16}
                                                        >
                                                            {labelPM}
                                                        </SvgText>
                                                    </G>
                                                </>
                                            );
                                        })
                                    }
                                </Svg>
                            ) : (
                                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                                    {
                                        HOURS.map((hour, index) => {
                                            const angle = ((index + 1) * 30 * Math.PI) / 180;
                                            const positionMinutes = {
                                                x: (size / 2) + Math.cos(angle) * ((size - 38) / 2),
                                                y: ((size + 5)/ 2) + Math.sin(angle) * ((size  - 38) / 2)
                                            };

                                            //@ts-ignore
                                            const label = labelsMinutes[index].label;
                                            const isSelected = label === time.minutes;
                                            //const isSelectedMinutes = labelMinutes === time.minutes;                  
                                            return(
                                                <>
                                                    {/* Minutos */}
                                                    <G key={index + 90} onPress={() => setTime(state => ({...state, minutes: label}))}>
                                                        <Circle
                                                            x={positionMinutes.x}
                                                            y={positionMinutes.y - 5}
                                                            r={strokeWidth}
                                                            stroke={theme.primary.primary}
                                                            strokeWidth={isSelected ? 3 : 0}
                                                            fill={isSelected ? theme.primary.primary : "transparent"}
                                                        />
                                                        <SvgText
                                                            x={positionMinutes.x}
                                                            y={positionMinutes.y}
                                                            textAnchor="middle"
                                                            fill={isSelected ? theme.primary.background : "black"}
                                                            fontSize={16}
                                                        >
                                                            {label}
                                                        </SvgText>
                                                    </G>
                                                </>
                                            );
                                        })
                                    }
                                </Svg>
                            )
                        }
                        <View style={styles.footerTimePicker}>
                            <View style={styles.typeTimePicker}>
                                <Pressable onPress={() => setIsHourVisible(true)} style={[styles.typeButtonTimePicker, isHourVisible ? styles.typeButtonTimePickerSelected : {}]}>
                                    <Text style={[{color: isHourVisible ? theme.primary.primary : "black" }, styles.textLabelTime]}>{time.hour}</Text>
                                </Pressable>
                                <Text style={[{ paddingHorizontal: 5 }, styles.textLabelTime]}>:</Text>
                                <Pressable onPress={() => setIsHourVisible(false)} style={[styles.typeButtonTimePicker, !isHourVisible ? styles.typeButtonTimePickerSelected : {}]}>
                                    <Text style={[{color: !isHourVisible ? theme.primary.primary : "black" }, styles.textLabelTime]}>{time.minutes}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.action}>
                            <Button size="small" variant="contained" onPress={() => handleSelect(time)}>Selecionar</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}