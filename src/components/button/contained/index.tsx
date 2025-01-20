/** @format */

import React, { forwardRef, LegacyRef, useState } from "react";
import { Pressable, View } from "react-native";
import { IButtonBaseProps } from "../interface";
import { Text } from "react-native";
import styleSheet from "./styles";

export default forwardRef(
  (
    { children, ...props }: IButtonBaseProps,
    ref: LegacyRef<View> | undefined
  ) => {
    const [active, setActive] = useState(false);
    const {
      whapperButtonContained,
      textButtonContained,
      iconContainedStart,
      iconContainedEnd,
    } = styleSheet({
      active,
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
        style: iconContainedStart,
      });
    }

    if (props.endIcon !== undefined && React.isValidElement(props.endIcon)) {
      endIcon = React.cloneElement(props.endIcon, {
        //@ts-ignore
        style: iconContainedEnd,
      });
    }

    if (typeof children === "string") {
      return (
        <Pressable
          {...props}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={whapperButtonContained}
          ref={ref}>
          {startIcon}
          <Text style={textButtonContained}>{children}</Text>
          {endIcon}
        </Pressable>
      );
    }

    return (
      <Pressable
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={whapperButtonContained}
        ref={ref}>
        {startIcon}
        {children}
        {endIcon}
      </Pressable>
    );
  }
);
