/** @format */

import React, { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import styleSheet from "./style";
import Typograph from "../typograph";
import Button from "../button";
import { useDialog } from "@/src/hooks";

interface DialogProps {
  children: ReactNode
}

export default ({ children }: DialogProps) => {
  const style = styleSheet();
  const { confirm, description, handleChange, open, title } = useDialog();

  const handleTrueConfirm = () => {
    handleChange();
    
    if(confirm){
      confirm(true)
    }
  }

  const handleFalseConfirm = () => {
    handleChange();

    if(confirm){
      confirm(false)
    }
  }

  return (
    <>
      {children}
      <Modal transparent={true} animationType='fade' visible={open}>
        <Pressable style={style.whapperDialog} onPress={handleChange}>
          <View style={style.containerDialog}>
            <View style={style.headerDialog}>
              <Typograph variant="h4" fontWeight={500}>{title}</Typograph>
            </View>
            <View style={{paddingVertical: 10}}>
              <Typograph variant="h6">{description}</Typograph>
            </View>
            <View style={style.footerDialog}>
              <Button onPress={handleFalseConfirm} mr={10} size="small" variant="outlined">
                Cancelar
              </Button>
              <Button onPress={handleTrueConfirm} size="small" variant="contained">
                Confirmar
              </Button>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
