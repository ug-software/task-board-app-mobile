import React, { ReactElement, ReactNode, useState } from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { TextFieldBase } from "../text-field";
import { styleSheetSelectField } from "./styles";

interface OptionProps {
    value: string
    children: ReactNode
}

export const Option = ({ children }: OptionProps) => {
    return children;
};

export interface SelectFieldBase extends TextFieldBase {
    children: ReactElement<{ value: string }>[] | ReactElement<{ value: string }>
}

export default ({ children, name, error = false, ...rest }: SelectFieldBase) => {
    const [isActive, setActive] = useState(false);
    const styles = styleSheetSelectField({ ...rest, active: isActive, name, error });
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelect = (value: string) => {
        setActive(state => !state);
        setModalVisible(state => !state);
        
        if(rest.onChangeText){
            rest.onChangeText(value);
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
    
    const handleBlur = () => {
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
                <Text>{rest.value}</Text>
            </Pressable>
            {error && (<Text style={styles.helperText}>{rest.helperText}</Text>)}
            <Modal visible={modalVisible} transparent animationType="fade">
                <Pressable style={styles.whapperModal} onPress={handleBlur}>
                    <View style={styles.containerModal}>
                        {
                            Array.isArray(children) ?
                            children.map((Option, index) => (
                                <Pressable style={[styles.option, { borderBottomWidth: children.length - 1 !== index ? 1 : 0 }]} key={index} onPress={() => handleSelect(Option.props.value)}>
                                    {Option}
                                </Pressable>
                            )) :
                            <Pressable onPress={() => handleSelect(children.props.value)}>
                                {children}
                            </Pressable>
                        }
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}