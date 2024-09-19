/** @format */

import { ReactNode } from "react";
import { DimensionValue, PressableProps, View } from "react-native";

export interface IButtonBaseProps extends PressableProps {
  children: ReactNode | string;
  startIcon?: React.JSX.Element;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  mt?: DimensionValue | undefined;
  mb?: DimensionValue | undefined;
  ml?: DimensionValue | undefined;
  mr?: DimensionValue | undefined;
  ref?: React.LegacyRef<View> | undefined;
}

export interface IButtonProps extends IButtonBaseProps {
  variant: "contained" | "outlined" | "text";
}
