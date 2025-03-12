/** @format */

import styleSheet from "@/src/app/styles";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { IButtonBaseProps } from "../interface";

export default ({ children, ref, ...props }: IButtonBaseProps) => {
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

  if (props.startIcon !== undefined && React.isValidElement(props.startIcon)) {
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
        ref={ref}
        {...props}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={whapperButtonContained}>
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
};
