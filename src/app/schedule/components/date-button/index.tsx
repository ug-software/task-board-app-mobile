/** @format */

import { Typograph } from "@/src/components";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import styleSheet from "./styles";

interface DateButtomProps extends PressableProps {
  date: string;
  day: number;
  month: number;
  year: number;
  isActive?: boolean;

}

export default ({ date, day, month, year, isActive, ...rest }: DateButtomProps) => {
  const today = new Date();
  const isCurrentDate =
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;
  const styles = styleSheet({
    isCurrentDate,
    isActive,
  });

  return (
    <Pressable {...rest} style={styles.whapperDateButtom}>
      <Typograph
        style={styles.textColor}
        fontSize={25}
        variant='h4'
        fontWeight={isActive ? "600" : "400"}>
        {day}
      </Typograph>
      <Typograph
        style={styles.textColor}
        variant='h5'
        fontWeight={isActive ? "600" : "400"}>
        {date}
      </Typograph>
    </Pressable>
  );
};
