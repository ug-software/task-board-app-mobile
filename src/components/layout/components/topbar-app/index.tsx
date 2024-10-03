/** @format */

import React, { ReactNode } from "react";
import { FlexStyle, View } from "react-native";
import createStyles from "./styles";
import { Tollbar } from "@/src/components";

export interface TopbarApp {
  children: ReactNode;
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
  flexDirection?: FlexStyle["flexDirection"];
  padding?: number;
  borderVisible?: boolean;
  pl?: number;
  pr?: number;
  pb?: number;
  pt?: number;
}

export default ({ children, ...props }: TopbarApp) => {
  const styles = createStyles(props);

  return (
    <View style={styles.whapperTopbarApp}>
      <View style={styles.containerTopbarApp}>{children}</View>
    </View>
  );
};
