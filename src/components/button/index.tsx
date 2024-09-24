/** @format */

import React, { forwardRef, LegacyRef, useState } from "react";
import { IButtonBaseProps } from "./interface";
import { Pressable, View, Text } from "react-native";
import createStyles from "./styles";

export default forwardRef(
  (
    { variant, children, ...props }: IButtonBaseProps,
    ref: LegacyRef<View> | undefined
  ) => {
    const [active, setActive] = useState(false);
    const {
      whapperButtonBase,
      textButtonBase,
      iconButtonBaseStart,
      iconButtonBaseEnd,
    } = createStyles({
      active,
      variant,
      ...props,
    });
    var startIcon = null;
    var endIcon = null;
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);

    if (
      props.startIcon !== undefined &&
      React.isValidElement(props.startIcon)
    ) {
      startIcon = React.cloneElement(props.startIcon, {
        //@ts-ignore
        style: iconButtonBaseStart,
      });
    }

    if (props.endIcon !== undefined && React.isValidElement(props.endIcon)) {
      endIcon = React.cloneElement(props.endIcon, {
        //@ts-ignore
        style: iconButtonBaseEnd,
      });
    }

    if (typeof children === "string") {
      return (
        <Pressable
          ref={ref}
          {...props}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={whapperButtonBase}>
          {startIcon}
          <Text style={textButtonBase}>{children}</Text>
          {endIcon}
        </Pressable>
      );
    }

    return (
      <Pressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={whapperButtonBase}
        ref={ref}>
        {startIcon}
        {children}
        {endIcon}
      </Pressable>
    );
  }
);
