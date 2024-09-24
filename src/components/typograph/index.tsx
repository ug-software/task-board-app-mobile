/** @format */

import { Text, TextStyle } from "react-native";
import createStyles from "./styles";
import React from "react";

type Color = "primary" | "secundary" | "light" | "dark";
type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "paragraph"
  | "subtitle";
export interface TypographProps {
  children: string | string[] | number | number[];
  variant: Variant;
  color?: Color;
  gutterBottom?: boolean;
  pb?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  fontWeight?: TextStyle["fontWeight"];
  fontSize?: TextStyle["fontSize"];
  style?: TextStyle;
}

export default (props: TypographProps) => {
  const { textWhapper } = createStyles(props);
  return <Text style={[textWhapper, props.style]}>{props.children}</Text>;
};
