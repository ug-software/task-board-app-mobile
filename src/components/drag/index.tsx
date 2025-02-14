/** @format */

import React, { useRef, useState } from "react";
import { PanResponder, View, ViewProps, ViewStyle } from "react-native";
import styleSheet from "./styles";

type onDrag = (
  horizontal: "left" | "right" | null | string,
  vertical: "top" | "bottom" | null | string
) => any;

export interface DragProps extends ViewProps {
  onDragPress: onDrag;
  height?: ViewStyle["height"];
  width?: ViewStyle["width"];
}

const Drag: React.FC<DragProps> = ({ children, onDragPress, style, ...props }) => {
  const styles = styleSheet({ ...props, style, onDragPress });
  const [dragState, setDragState] = useState<{ horizontal: string | null; vertical: string | null }>({
    horizontal: null,
    vertical: null,
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        let horizontal: "left" | "right" | null = null;
        let vertical: "top" | "bottom" | null = null;

        if (gestureState.dx > 10) horizontal = "right";
        if (gestureState.dx < -10) horizontal = "left";
        if (gestureState.dy > 10) vertical = "bottom";
        if (gestureState.dy < -10) vertical = "top";

        setDragState({ horizontal, vertical });
        onDragPress(horizontal, vertical);
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={[styles.dragArea, style]} {...props}>
      {children}
    </View>
  );
};

export default Drag;