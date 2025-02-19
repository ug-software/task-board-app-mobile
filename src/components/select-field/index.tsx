import React, { ReactElement, ReactNode, useState } from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { TextFieldBase } from "../text-field";
import { styleSheetSelectField } from "./styles";
import Icon from "../icon";

interface OptionProps {
    value: string | number
    children: ReactNode
}

export const Option = ({ children, ...rest }: OptionProps) => {
    return React.isValidElement(children) && React.cloneElement(children, rest);
};

export interface SelectFieldBase extends Omit<TextFieldBase, "value"> {
    children: ReactElement<{ value: string }>[] | ReactElement<{ value: string }>,
    value: number | string | Date | undefined
}

export default ({ children, name, error = false, ...rest }: SelectFieldBase) => {
    const [isActive, setActive] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const styles = styleSheetSelectField({ ...rest, active: isActive, name, error });

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
                <View>
                    <Text style={styles.labelTextFieldFiled}>{rest.label}</Text>
                    <Text>{rest.value?.toString()}</Text>
                </View>
                <Icon 
                    style={styles.rightIcon} 
                    //@ts-ignore
                    name="keyboard-arrow-down" 
                    type="MaterialIcons" 
                />
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