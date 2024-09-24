/** @format */

import React from "react";
import { View } from "react-native";
import createStyles from "./styles";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import useTheme from "@/src/theme/use-theme";

export default () => {
  const { whapperTollbar } = createStyles({});
  const theme = useTheme();
  return (
    <View style={whapperTollbar}>
      <ExpoStatusBar
        style='dark'
        backgroundColor={theme.pallet.primary.background}
      />
    </View>
  );
};
