/** @format */

import React, { useRef, useState } from "react";
import { TextInput, Text, Pressable } from "react-native";
import { TextFieldBase } from "..";
import styleSheet from "./style";
import { lighten } from "@/src/theme/styled";

export default ({ label, name, ...props }: TextFieldBase) => {
  const input = useRef<TextInput>(null);
  const error = props.error !== undefined ? props.error : false;
  const [isActive, setActive] = useState(false);

  const { whapperTextFieldFiled, labelTextFieldFiled, inputTextFieldFiled, helperText } =
    styleSheet({ ...props, active: isActive, name, error });

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
    <>
      <Pressable
        onPressIn={handleFocus}
        style={[whapperTextFieldFiled, props.style]}>
        <Text style={labelTextFieldFiled}>{label}</Text>
        <TextInput
          {...props}
          key={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={input}
          //@ts-ignore
          selectionColor={lighten(labelTextFieldFiled?.color, 60)}
          style={inputTextFieldFiled}
        />
      </Pressable>
      {props.error && (<Text style={helperText}>{props.helperText}</Text>)}
    </>
  );
};
