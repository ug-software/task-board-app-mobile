/** @format */

import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";

interface IProps {
  children: ReactNode;
  layoutOn: boolean;
}

export default ({ children, layoutOn }: IProps) => {
  if (!layoutOn) {
    return children;
  }

  return <View>{children}</View>;
};
