import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureEvent, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerEventPayload, State } from "react-native-gesture-handler";
import styleSheet from "./styles";

interface DragDividerProps {
  onDragRelease: (direction: "up" | "down") => void
  onDragPosition?: (position: number) => void
  maxDown?: number
  maxUp?: number
}

export default ({ onDragRelease, onDragPosition, maxDown, maxUp } : DragDividerProps) => {
  const [translateY, setTranslateY] = useState(0);
  const styles = styleSheet();

  const handleGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    var position = event.nativeEvent.translationY;
    
    if(maxDown){
      if(position >= maxDown){
        setTranslateY(maxDown);
      }else{
        setTranslateY(event.nativeEvent.translationY);
      }

      return;
    }

    if(maxUp){
      if(position <= maxUp){
        setTranslateY(maxUp);
      }else {
        setTranslateY(event.nativeEvent.translationY);
      }

      return;
    }

    setTranslateY(event.nativeEvent.translationY);
  };

  const handleEnd = (event: any) => {
    const direction = event.nativeEvent.translationY > 0 ? "down" : "up";
    setTranslateY(0);
    onDragRelease(direction);
  };

  useEffect(() => {
    if(onDragPosition){
      onDragPosition(translateY);
    }
  }, [translateY])

  return (
    <GestureHandlerRootView style={{width: "100%", position: "relative"}}>
        <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={(event) => {
                if (event.nativeEvent.state === State.END) {
                handleEnd(event);
                }
            }}
        >
            <View style={styles.whapperDragDivider}>
                <View style={styles.divider} />
            </View>
        </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

