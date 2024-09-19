/** @format */

import { Pressable, View } from "react-native";
import { IconButtonBase } from "..";
import React, { forwardRef, LegacyRef, useState } from "react";
import IconComponent from "@/components/icon";
import createStyles from "./styles";

export default ({ ref, ...props }: IconButtonBase) => {
  const [active, setActive] = useState(false);

  const handlePressIn = () => setActive(true);
  const handlePressOut = () => setActive(false);

  const { whapperIconButton } = createStyles({ ...props, active });
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
};
