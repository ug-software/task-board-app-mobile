/** @format */

import { Typograph } from "@/src/components";
import React from "react";
import { Pressable } from "react-native";
import createStyles from "./styles";

interface DateButtomProps {
  date: number;
  day: number;
  month: number;
  year: number;
  isActive?: boolean;
}

export default ({ date, day, month, year, isActive }: DateButtomProps) => {
  const today = new Date();
  const isCurrentDate =
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;
  const styles = createStyles({
    isCurrentDate,
    isActive,
  });

  return (
    <Pressable style={styles.whapperDateButtom}>
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
