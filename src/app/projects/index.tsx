/** @format */

import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";

const App = () => {
  const height = useRef(new Animated.Value(200)).current;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
    Animated.timing(height, {
      toValue: 600,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const handleClose = () => {
    setIsOpen(false);
    Animated.timing(height, {
      toValue: 200,
      duration: 400,
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
    <View style={styles.container}>
      <Animated.View style={[styles.adjustableView, { height }]}>
        <Text style={styles.text}>Esta view é ajustável!</Text>
        <View {...panResponder.panHandlers} style={styles.dragArea} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  adjustableView: {
    backgroundColor: "lightblue",
    justifyContent: "space-between",
    marginRight: 10,
    width: "100%",
    padding: 10,
    minHeight: 200,
  },
  dragArea: {
    height: 20,
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  text: {
    margin: 10,
  },
});

export default App;
