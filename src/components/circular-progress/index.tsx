/** @format */

import { lighten } from "@/src/theme/styled";
import useTheme from "@/src/theme/use-theme";
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

interface CircularProgressProps {
  size: number;
  strokeSize: number;
  strokeColor: string | "default";
  value: number;
  title?: string;
  suffix?: string;
}

export default ({
  size,
  strokeColor,
  strokeSize,
  value,
  title,
  suffix,
}: CircularProgressProps) => {
  const theme = useTheme();
  return (
    <CircularProgress
      title={title}
      value={value}
      valueSuffix={suffix}
      activeStrokeWidth={strokeSize}
      activeStrokeColor={
        strokeColor === "default" ? theme.pallet.primary.primary : strokeColor
      }
      progressValueColor={
        strokeColor === "default" ? theme.pallet.primary.main : strokeColor
      }
      inActiveStrokeColor={
        strokeColor === "default"
          ? lighten(theme.pallet.primary.main, 50)
          : lighten(strokeColor, 85)
      }
      radius={size}
      inActiveStrokeWidth={strokeSize}
    />
  );
};
