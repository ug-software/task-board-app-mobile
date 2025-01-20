/** @format */

import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewProps, ViewStyle } from "react-native";
import { Theme } from "../interfaces";
import useTheme from "../use-theme";
import ligten from "./ligten";
import darken from "./darken";
import alpha from "./alpha";
import { textColorBasedOnBackground, luminance } from "./luminance";
import React from "react";
import View from "./components/view";

interface StylesSheet {
  [key: string] : ViewStyle | TextStyle | ImageStyle
}

type ContextStyle = {
  theme: Theme;
  width: number;
};

type callback<T extends {}, S> = (context: ContextStyle & T) => StylesSheet & S

export default function styled<T extends {}>() {
  return function<S>(callback: StylesSheet | callback<T, S> ) {
    return function(props ?: T) {
      var theme = useTheme();
      var { width } = Dimensions.get('screen');

      if(typeof callback === "object")
        return callback;

      if(typeof callback === "function" && props !== undefined) 
        return callback({ theme, width, ...props });
    
      return callback({theme, width});
    }
  }
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

export { ligten, darken, luminance, textColorBasedOnBackground, alpha };
