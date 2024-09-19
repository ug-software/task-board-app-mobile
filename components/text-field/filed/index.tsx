/** @format */

import React, { useRef, useState } from "react";
import { TextInput, Text, Pressable } from "react-native";
import { TextFieldBase } from "..";
import createStyles from "./style";
import { ligten } from "@/theme/styled";

export default ({ label, ...props }: TextFieldBase) => {
  const input = useRef<TextInput>(null);
  const [isActive, setActive] = useState(false);

  const { whapperTextFieldFiled, labelTextFieldFiled, inputTextFieldFiled } =
    createStyles({ ...props, active: isActive });

  const handleFocus = () => {
    setActive(true);
    if (input.current !== null) {
      input.current.focus();
    }
  };
  const handleBlur = () => {
    setActive(false);
    if (input.current !== null) {
      input.current.blur();
    }
  };

  return (
    <Pressable
      onPressIn={handleFocus}
      style={[whapperTextFieldFiled, props.style]}>
      <Text style={labelTextFieldFiled}>{label}</Text>
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={input}
        //@ts-ignore
        selectionColor={ligten(labelTextFieldFiled?.color, 60)}
        style={inputTextFieldFiled}
      />
    </Pressable>
  );
};
