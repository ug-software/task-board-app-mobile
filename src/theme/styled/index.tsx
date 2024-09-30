/** @format */

import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Theme } from "../interfaces";
import useTheme from "../use-theme";
import ligten from "./ligten";
import darken from "./darken";
import { textColorBasedOnBackground, luminance } from "./luminance";

type ContextStyleType<T> = ContextStyle & T;
interface ContextStyle {
  theme: Theme;
  width: number;
}

export default function styled<T>(
  callback: (context: ContextStyleType<T>) => StyleSheet.NamedStyles<any>
) {
  return function createStyle(props: T) {
    const theme = useTheme();
    const { width } = Dimensions.get("window");
    return callback({ ...props, theme, width });
  };
}

export { ligten, darken, luminance, textColorBasedOnBackground };
