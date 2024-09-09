/** @format */

import React from "react";
import { TextStyle } from "react-native";
import * as IconLibrary from "@expo/vector-icons";
import { AntDesignIcons, MaterialCommunityIcons } from "./names";

type IconType = keyof typeof IconLibrary;
type IconName<T extends IconType> = T extends "AntDesign"
  ? AntDesignIcons
  : MaterialCommunityIcons;

interface IconProps<T extends IconType> {
  type: T;
  name: IconName<T>;
  size?: number;
  color?: string;
  style?: TextStyle;
}

const IconComponent = <T extends IconType>({
  type,
  name,
  size = 24,
  color = "black",
  style,
}: IconProps<T>) => {
  const Icon = IconLibrary[type];

  if (!Icon) {
    console.error(`Icon type "${type}" not found.`);
    return null;
  }

  return <Icon name={name} size={size} color={color} style={style} />;
};

export default IconComponent;
