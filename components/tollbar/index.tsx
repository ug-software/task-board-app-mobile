/** @format */

import React from "react";
import { View } from "react-native";
import createStyles from "./styles";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default () => {
  const { whapperTollbar } = createStyles({});
  return (
    <View style={whapperTollbar}>
      <ExpoStatusBar backgroundColor='#000000' />
    </View>
  );
};
