/** @format */

import { ReactNode } from "react";
import { PressableProps } from "react-native";

export interface IButtonBaseProps extends PressableProps {
  children: ReactNode | string;
  startIcon?: React.JSX.Element;
  endIcon?: ReactNode;
}

export interface IButtonProps extends IButtonBaseProps {
  variant: "contained" | "outlined" | "text";
}
