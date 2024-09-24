/** @format */

import { forwardRef, LegacyRef } from "react";
import { PressableProps, View } from "react-native";
import Outlined from "./outlined";
import React from "react";

export interface IconButtonBase extends PressableProps {
  ref?: LegacyRef<View> | undefined;
}

interface IconButtonProps extends IconButtonBase {
  variant: "outlined" | "contained";
}

export default forwardRef(
  (
    { variant, ...props }: IconButtonProps,
    ref: LegacyRef<View> | undefined
  ) => {
    switch (variant) {
      case "outlined":
        return <Outlined {...props} ref={ref} />;

      default:
        return <Outlined {...props} ref={ref} />;
    }
  }
);
