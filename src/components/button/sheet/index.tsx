/** @format */

import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import {
  Animated,
  Easing,
  Modal,
  PanResponder,
  Pressable,
  View,
} from "react-native";
import styleSheet from "./styles";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface ButtonSheetProps {
  children: ReactNode;
  height: number;
  open: boolean;
  onRequestClose: () => void
}

export default ({
  children,
  height,
  open,
  onRequestClose
}: ButtonSheetProps) => {
  const duration = 300;
  const styles = styleSheet({ height });
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;

  const handleClose = () => {
    if(!open){
      Animated.timing(translateY, {
        toValue: height,
        duration: duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const handleOpen = () => {
    if(open){
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const pan = Gesture.Pan()
    .minDistance(1)
    .onFinalize((event) => {
      if (event.translationY > 5) {
        handleClose();
      }
    })
    .runOnJS(true);

  useEffect(() => {
    if(open){
      setIsOpen(true);
      handleOpen();
    }else{
      handleClose();
      setTimeout(() => setIsOpen(false), duration)
    }
  }, [open]);

  return (
    <Modal visible={isOpen} transparent>
      <View style={styles.whapperButtonSheet}>
        <Pressable onPress={onRequestClose} style={{ height: "100%" }} />
        <Animated.View
          style={[
            styles.containerButtonSheet,
            { transform: [{ translateY }] },
          ]}>
          <GestureHandlerRootView style={styles.whapperGesture}>
            <GestureDetector gesture={pan}>
              <View style={styles.whapperDot}>
                <View style={styles.dot} />
              </View>
            </GestureDetector>
          </GestureHandlerRootView>
          <View>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};
