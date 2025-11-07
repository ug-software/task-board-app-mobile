/** @format */

import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewProps, ViewStyle } from "react-native";
import { Theme } from "../interfaces";
import useTheme from "../use-theme";
import lighten from "./lighten";
import darken from "./darken";
import alpha from "./alpha";
import { textColorBasedOnBackground, luminance } from "./luminance";
import React, { useMemo } from "react";
import View from "./components/view";

interface StylesSheet {
  [key: string] : ViewStyle | TextStyle | ImageStyle
}

type ContextStyle = {
  theme: Theme;
  width: number;
};

type callback<T extends {}, S> = (context: ContextStyle & T) => StylesSheet & S
type StyledCallback<T, S> = (params: T & { theme: any; width: number }) => S;

export default function styled<T extends object = {}>() {
  return function <S>(
    callback: StylesSheet | callback<T, S>
  ) {
    return function useStyled(props?: T) {
      const theme = useTheme();
      const { width } = Dimensions.get("screen");

      return useMemo(() => {
        if (typeof callback === "object") {
          return callback as S;
        }

        const base = { theme, width, ...(props || {}) } as T & { theme: any; width: number };

        return (callback as StyledCallback<T, S>)(base);
      }, [theme, width, props]);
    };
  };
}

export type Component = "view";
export type ComponentProps <T extends Component> = T extends "view" ? ViewProps : ViewProps;

export function styledV2<T extends {}>(component: Component) {
  return function<S>(callback: StylesSheet | callback<T, S> ) {
    return function(props ?: T) {
      var css = {} as any;
      var theme = useTheme();
      var { width } = Dimensions.get('screen');

      if(typeof callback === "object")
        css = callback;

      if(typeof callback === "function" && props !== undefined) 
        css = callback({ theme, width, ...props });
    
      switch (component) {
        case "view":
          return (<View {...props}/>);
      
        default:
          return (<View {...props}/>);
      }
    }
  }
}

export { lighten, darken, luminance, textColorBasedOnBackground, alpha };
