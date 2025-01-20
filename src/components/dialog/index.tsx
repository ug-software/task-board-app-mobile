/** @format */

import React, { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import styleSheet from "./style";

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default ({ children, onClose, open }: DialogProps) => {
  const style = styleSheet({});
  return (
    <Modal transparent={true} animationType='fade' visible={open}>
      <Pressable style={style.whapperDialog} onPress={onClose}>
        <View style={style.containerDialog}>{children}</View>
      </Pressable>
    </Modal>
  );
};
