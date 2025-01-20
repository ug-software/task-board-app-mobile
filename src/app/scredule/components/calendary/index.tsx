/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styleSheet from "./styles";
import { calendary } from "@/src/constants";
import { getNumberOfDaysInTheMonth } from "@/src/utils/date";
import { IconButton, Typograph } from "@/src/components";
import { splitArray } from "@/src/utils/array";

interface Day {
  value: number;
  month?: number;
  year?: number;
  type: "past" | "current" | "next";
  isActive?: boolean;
}

interface CalendaryProps {
  onSelectDate?: () => Date;
  month: number;
  year: number;
}

const Day = ({ type, value, month, year, isActive }: Day) => {
  var currentDay = new Date();
  const isCurrent =
    currentDay.getDate() === value &&
    currentDay.getMonth() === month &&
    currentDay.getFullYear() === year;
  const styles = styleSheet({});

  if (type === "current") {
    return (
      <View key={value} style={styles.day}>
        <IconButton
          borderVisible={isCurrent}
          variant={isActive ? "contained" : "outlined"}>
          <Typograph variant='h6' fontWeight={"500"}>
            {value}
          </Typograph>
        </IconButton>
      </View>
    );
  }

  return (
    <View key={value} style={styles.day}>
      <Typograph variant='h6' fontWeight={"500"} style={styles.fontColor}>
        {value}
      </Typograph>
    </View>
  );
};

export default ({ month, year }: CalendaryProps) => {
  const styles = styleSheet({});
  const [arrayDays, setArrayDays] = useState<Day[][]>([]);

  useEffect(() => {
    var firstDay = new Date(year, month, 1);
    var days = getNumberOfDaysInTheMonth(month, year);
    var daysInArray = Array.from({ length: days }).map((_, index) => ({
      type: "current",
      value: index + 1,
    }));

    var firstDayOfTheWeek = firstDay.getDay();
    var lastDayMouthPast = new Date(year, month, 0).getDate();
    var daysPast = Array.from({ length: firstDayOfTheWeek })
      .map((_, index) => ({ type: "past", value: lastDayMouthPast - index }))
      .reverse();

    var lastDayMouth = new Date(year, month + 1, 0).getDay();
    var daysFirstWeekProxMouth = Array.from({ length: 6 - lastDayMouth }).map(
      (_, index) => ({ type: "next", value: index + 1 })
    );
    daysInArray = [...daysPast, ...daysInArray, ...daysFirstWeekProxMouth];
    setArrayDays(splitArray(daysInArray, 7));
  }, []);

  return (
    <View style={styles.whapperCalendary}>
      <View style={styles.headerWeek}>
        {Object.keys(calendary.week).map((day, index) => (
          <View key={index} style={styles.day}>
            <Typograph color='primary' variant='h6' fontWeight={"600"}>
              {calendary.week[day].abbreviated}
            </Typograph>
          </View>
        ))}
      </View>
      {arrayDays.map((week, index) => (
        <View key={index} style={styles.week}>
          {week.map((day, index) => (
            <Day key={index} {...day} month={month} year={year} />
          ))}
        </View>
      ))}
    </View>
  );
};
