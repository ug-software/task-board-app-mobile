/** @format */

import React, { forwardRef, LegacyRef } from "react";
import Contained from "./contained";
import { IButtonProps } from "./interface";
import Outlined from "./outlined";
import { View } from "react-native";

export default forwardRef(
  ({ variant, ...props }: IButtonProps, ref: LegacyRef<View> | undefined) => {
    switch (variant) {
      case "contained":
        return <Contained {...props} ref={ref} />;

      case "outlined":
        return <Outlined {...props} ref={ref} />;

      default:
        return <Contained {...props} ref={ref} />;
    }
  }
);
