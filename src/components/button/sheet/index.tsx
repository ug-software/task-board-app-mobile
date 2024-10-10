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
import createStyles from "./styles";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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
  const duration = 300;
  const styles = createStyles({ height });
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setTimeout(() => onRequestClose(), duration);
  };

  const handleOpen = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
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
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        handleOpen();
      } else {
        handleClose();
      }
    }, 100);
  }, [isOpen]);

  return (
    <Modal visible={isOpen} onRequestClose={handleClose} transparent>
      <View style={styles.whapperButtonSheet}>
        <Pressable onPress={handleClose} style={{ height: "100%" }} />
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
