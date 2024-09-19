/** @format */

import React from "react";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import createStyles from "./styles";

interface CardProps extends ViewProps {
  children: ReactNode;
}

export default ({ children, style, ...props }: CardProps) => {
  const { whapperCard } = createStyles({});

  return (
    <View style={[whapperCard, style]} {...props}>
      {children}
    </View>
  );
};
