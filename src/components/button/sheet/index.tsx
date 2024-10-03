/** @format */

import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import { Animated, Modal, PanResponder, View } from "react-native";
import createStyles from "./styles";

interface ButtonSheetProps {
  children: ReactNode;
  height: number;
  open: boolean;
  onRequestClose: () => void;
}

export default ({
  children,
  height,
  open,
  onRequestClose,
}: ButtonSheetProps) => {
  const styles = createStyles({});
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log("gestureState.dy", gestureState.dy);
        if (gestureState.dy > 20) {
          handleClose();
        } else {
          handleOpen();
        }
      },
    })
  ).current;

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    onRequestClose();
  };

  const handleOpen = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={open} onRequestClose={onRequestClose} transparent>
      <View style={styles.whapperButtonSheet}>
        <Animated.View style={[styles.containerButtonSheet, { translateY }]}>
          <View {...panResponder.panHandlers} style={styles.whapperDot}>
            <View style={styles.dot} />
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};
