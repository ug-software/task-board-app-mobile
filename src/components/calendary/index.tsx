/** @format */

import React, { memo, useCallback, useMemo } from "react";
import { View } from "react-native";
import styleSheet from "./styles";
import { calendary } from "@/src/constants";
import { getNumberOfDaysInTheMonth } from "@/src/utils/date";
import { splitArray } from "@/src/utils/array";
import IconButton from "../icon-button";
import Typograph from "../typograph";

interface Day {
  value: number;
  month?: number;
  year?: number;
  type: "past" | "current" | "next";
  isActive?: boolean;
  onSelectDate?: (date: Date) => void;
}

interface CalendaryProps {
  onSelectDate?: (date: Date) => void;
  month: number;
  year: number;
  day?: number;
  currentDate: Date
}

const Day = memo(({ type, value, month, year, isActive, onSelectDate }: Day) => {
  var currentDay = new Date();
  const styles = styleSheet({});

  const isCurrent = useMemo(() => {
    return currentDay.getDate() === value &&
    currentDay.getMonth() === month &&
    currentDay.getFullYear() === year;
  }, [value, month, year])  

  const handleSelect = useCallback(() => {   
    if(onSelectDate && year && month){
      onSelectDate(new Date(year, month, value))
    }
  }, [year, month])

  if (type === "current") {
    return (
      <View key={value} style={styles.day}>
        <IconButton
          onPress={handleSelect}
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
});

export default memo(({ month, year, currentDate = new Date(), onSelectDate, ...props }: CalendaryProps) => {
  const styles = styleSheet({});
  
  const arrayDays = useMemo<Day[][]>(() => {
    var firstDay = new Date(year, month, 1);
    var days = getNumberOfDaysInTheMonth(month, year);
    var daysInArray = Array.from({ length: days }).map((_, index) => ({
      type: "current",
      value: index + 1,
      month,
      year
    }));

    var firstDayOfTheWeek = firstDay.getDay();
    var lastDayMouthPast = new Date(year, month, 0).getDate();
    var daysPast = Array.from({ length: firstDayOfTheWeek })
      .map((_, index) => ({ type: "past", value: lastDayMouthPast - index, month, year }))
      .reverse();

    var lastDayMouth = new Date(year, month + 1, 0).getDay();
    var daysFirstWeekProxMouth = Array.from({ length: 6 - lastDayMouth }).map(
      (_, index) => ({ type: "next", value: index + 1, month, year })
    );
    daysInArray = [...daysPast, ...daysInArray, ...daysFirstWeekProxMouth];
    
    return splitArray(daysInArray, 7)
  },[month, year]);

  return (
    <View style={styles.whapperCalendary}>
      <View style={styles.headerWeek}>
        {Object.keys(calendary.week).map((day, index) => (
          <View key={index} style={styles.day}>
            <Typograph color='primary' variant='h6' fontWeight={"600"}>
              {
                //@ts-ignore
                calendary.week[day].abbreviated
              }
            </Typograph>
          </View>
        ))}
      </View>
      {arrayDays.map((week, index) => (
        <View key={index} style={styles.week}>
          {week.map((day, index) => {            
            var isActive = day.value === currentDate.getDate() && day.month === currentDate.getMonth() && day.year === currentDate.getFullYear();
            return <Day  key={index} {...day} isActive={isActive} month={month} year={year} onSelectDate={onSelectDate} />
          })}
        </View>
      ))}
    </View>
  );
});
