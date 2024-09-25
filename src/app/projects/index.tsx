/** @format */

import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";

const App = () => {
  const height = useRef(new Animated.Value(200)).current; // Altura inicial da view ajustável

  const handleOpen = () => {
    Animated.timing(height, {
      toValue: 400, // Retorna à altura original
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(height, {
      toValue: 200, // Retorna à altura original
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        //return gestureState.dy !== 0; // Permitir movimento se houver movimento vertical
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx);
        if (gestureState.dx < 0) {
          handleOpen();
        }

        if (gestureState.dx > 0) {
          handleClose();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Se o usuário arrastar mais de um certo limite, defina a altura mínima
        /*if (gestureState.dy > 100) {
          Animated.timing(height, {
            toValue: 400, // Retorna à altura original
            duration: 600,
            useNativeDriver: false,
          }).start();
        }*/
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
    height: 20, // Área para arrastar
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
