/** @format */

import { DimensionValue, TextInputProps } from "react-native";
import TextFieldFiled from "./filed";
import React from "react";

export interface TextFieldBase extends TextInputProps {
  label: string;
  fullWidth?: boolean;
  width?: DimensionValue | undefined;
}

interface TextFieldProps extends TextFieldBase {
  variant: "filed";
}

export default ({ variant, ...props }: TextFieldProps) => {
  switch (variant) {
    case "filed":
      return <TextFieldFiled {...props} />;

    default:
      break;
  }
};
