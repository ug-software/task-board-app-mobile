/** @format */

import { forwardRef, LegacyRef, useState } from "react";
import { Pressable, PressableProps, View } from "react-native";
import React from "react";
import createStyles from "./styles";

export interface IconButtonBase extends PressableProps {
  ref?: LegacyRef<View> | undefined;
  borderVisible?: boolean;
  variant: "outlined" | "contained";
}

export default forwardRef(
  ({ variant, ...props }: IconButtonBase, ref: LegacyRef<View> | undefined) => {
    const [active, setActive] = useState(false);

    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);

    const { whapperIconButton } = createStyles({ ...props, active, variant });
    return (
      <Pressable
        ref={ref}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={whapperIconButton}
        {...props}>
        {props.children}
      </Pressable>
    );
  }
);
