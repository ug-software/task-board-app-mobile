/** @format */

import { Typograph } from "@/src/components";
import React from "react";
import { Pressable } from "react-native";
import createStyles from "./styles";

const days = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

interface DateButtomProps {
  date: number;
  day: number;
  mounth: number;
}

export default ({ date, day, mounth }: DateButtomProps) => {
  const today = new Date();
  const isActiveDate = today.getDate() === date && today.getMonth() === mounth;
  const styles = createStyles({
    isActiveDate,
  });

  return (
    <Pressable style={styles.whapperDateButtom}>
      <Typograph
        style={styles.textColor}
        fontSize={25}
        variant='h4'
        fontWeight={isActiveDate ? "600" : "400"}>
        {date}
      </Typograph>
      <Typograph
        style={styles.textColor}
        variant='h5'
        fontWeight={isActiveDate ? "600" : "400"}>
        {days[day]}
      </Typograph>
    </Pressable>
  );
};
