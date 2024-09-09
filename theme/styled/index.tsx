/** @format */

import { StyleSheet } from "react-native";
import { Theme } from "../interfaces";
import useTheme from "../use-theme";
import ligten from "./ligten";
import darken from "./darken";
import { textColorBasedOnBackground, luminance } from "./luminance";

type ContextStyleType<T> = ContextStyle & T;
interface ContextStyle {
  theme: Theme;
}

export default function styled<T>(
  callback: (context: ContextStyleType<T>) => StyleSheet.NamedStyles<any>
) {
  return function createStyle(props: T) {
    const theme = useTheme();
    return callback({ ...props, theme });
  };
}

export { ligten, darken, luminance, textColorBasedOnBackground };
