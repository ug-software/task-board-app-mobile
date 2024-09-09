/** @format */

import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default () => {
  // Estado para a posição do clique
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  // Ref para o valor de animação
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Função para animar a esfera
  const animateBubble = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;

    // Atualiza a posição do clique
    setClickPosition({ x: pageX, y: pageY });

    // Define a posição inicial da esfera
    positionAnim.setValue({ x: pageX - 50, y: pageY - 50 });

    // Animação da esfera
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 2, // Aumenta o tamanho para o dobro
          duration: 300, // Duração do crescimento
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim, {
          toValue: { x: pageX - 50, y: pageY - 50 },
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scaleAnim, {
        toValue: 0, // Diminui o tamanho para zero
        duration: 300, // Duração do retorno
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={animateBubble}>
        <View style={styles.absoluteFill} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bubble,
          {
            transform: [
              { scale: scaleAnim },
              { translateX: positionAnim.x },
              { translateY: positionAnim.y },
            ],
          },
        ]}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Clique na Tela</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bubble: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "blue",
    top: 0,
    left: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    padding: 15,
    backgroundColor: "#6200ee",
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
