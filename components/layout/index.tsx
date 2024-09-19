/** @format */

import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";
import { AppBar } from "./components";
import createStyles from "./styles";

export interface LayoutProps {
  children: ReactNode;
  layoutOn: boolean;
}

export default (props: LayoutProps) => {
  if (!props.layoutOn) {
    return props.children;
  }

  const { whapperLayout, containerApp } = createStyles(props);

  return (
    <View style={whapperLayout}>
      <View style={containerApp}>{props.children}</View>
      <AppBar />
    </View>
  );
};
