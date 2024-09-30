/** @format */

import React, { useRef, useState } from "react";
import { PanResponder, View, ViewProps, ViewStyle } from "react-native";
import createStyles from "./styles";

type onDrag = (
  horizontal: "left" | "right" | null | string,
  vertical: "top" | "bottom" | null | string
) => any;

export interface DragProps extends ViewProps {
  onDragPress: onDrag;
  height?: ViewStyle["height"];
  width?: ViewStyle["width"];
}

export default ({ children, onDragPress, style, ...props }: DragProps) => {
  const styles = createStyles({ ...props, style, onDragPress });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderRelease: (e, gestureState) => {
        var horizontal = null;
        var vertical = null;

        if (gestureState.dx > 10) {
          horizontal = "left";
        }
        if (gestureState.dx < -10) {
          horizontal = "right";
        }

        if (gestureState.dy > 10) {
          vertical = "top";
        }
        if (gestureState.dy < -10) {
          vertical = "bottom";
        }
        onDragPress(horizontal, vertical);
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={[styles.dragArea, style]}
      {...props}>
      {children}
    </View>
  );
};
