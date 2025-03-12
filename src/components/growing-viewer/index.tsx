/** @format */

import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, View, ViewProps } from "react-native";
import styleSheet from "./styles";

interface GrowingViewer extends Omit<ViewProps, "children"> {
  children: (isOpen: IsOpen, isClose: IsClose) => ReactNode;
  minHeight: number;
  maxHeight: number;
  durationAnimation: number;
}

interface ChangedGrowingViewer {
  children: ReactNode;
  durationAnimation: number;
}

type IsOpen = (props: ChangedGrowingViewer) => ReactNode;
const IsOpen = (open: boolean) => {
  return memo(({ children, durationAnimation }: ChangedGrowingViewer) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (open) {
        Animated.timing(opacity, {
          toValue: 1,
          duration: durationAnimation,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(opacity, {
          toValue: 0,
          duration: durationAnimation,
          useNativeDriver: true,
        }).start();
      }
    }, [open]);

    return (
      <Animated.View
        id='is-close'
        style={{ opacity, display: open ? "flex" : "none" }}>
        {children}
      </Animated.View>
    );
  });
};

type IsClose = (props: ChangedGrowingViewer) => ReactNode;
const IsClose = (open: boolean) => {
  return memo(({ children, durationAnimation }: ChangedGrowingViewer) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (!open) {
        Animated.timing(opacity, {
          toValue: 1,
          duration: durationAnimation,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(opacity, {
          toValue: 0,
          duration: durationAnimation,
          useNativeDriver: true,
        }).start();
      }
    }, [open]);

    return (
      <Animated.View
        id='is-close'
        style={{ opacity, display: !open ? "flex" : "none" }}>
        {children}
      </Animated.View>
    );
  });
};

export default ({
  children,
  style,
  maxHeight,
  minHeight,
  durationAnimation,
  ...props
}: GrowingViewer) => {
  const styles = styleSheet({});
  const height = useRef(new Animated.Value(minHeight)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Open = IsOpen(isOpen);
  const Close = IsClose(isOpen);

  const handleOpen = () => {
    setIsOpen(true);
    Animated.timing(height, {
      toValue: maxHeight,
      duration: durationAnimation,
      useNativeDriver: false,
    }).start();
  };

  const handleClose = () => {
    setIsOpen(false);
    Animated.timing(height, {
      toValue: minHeight,
      duration: durationAnimation,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy !== 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 10) {
          handleOpen();
        }

        if (gestureState.dy < 0) {
          handleClose();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...props}
      style={[styles.adjustableView, style, { height }]}>
      <Animated.View style={opacity}>{children(Open, Close)}</Animated.View>
      <View {...panResponder.panHandlers} style={styles.dragArea}>
        <View style={styles.dragIcon} />
      </View>
    </Animated.View>
  );
};
