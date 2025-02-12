import { DateTime, getDaysTheMouth } from "@/src/utils/date";
import { useState } from "react";

export interface Calendary {
  day: Date;
  dates: DateTime[];
  month: number;
  year: number;
}

export default () => {
    var currentDay = new Date();

  const [calendary, setCalendary] = useState<Calendary>({
    day: currentDay,
    dates: getDaysTheMouth(currentDay.getMonth(), currentDay.getFullYear()),
    month: currentDay.getMonth(),
    year: currentDay.getFullYear(),
  });

  const handleChangeDate = (date: Date) => {
    setCalendary((state) => ({
      day: date,
      dates: getDaysTheMouth(date.getMonth(), date.getFullYear()),
      month: date.getMonth(),
      year: date.getFullYear(),
    }));
  }

  const handleChangeCalendary = (
    horizontal: "left" | "right" | null | string
  ) => {    
    var mouth = calendary.day.getMonth();
    var year = calendary.day.getFullYear();

    if (horizontal === "right") {
      if (calendary.day.getMonth() + 1 > 11) {
        mouth = 0;
        year = year + 1;
      } else {
        mouth = mouth + 1;
      }

      setCalendary((state) => ({
        day: new Date(state.day.getFullYear(), state.day.getMonth() + 1, 1),
        dates: getDaysTheMouth(mouth, year),
        month: mouth,
        year: year,
      }));
    }

    if (horizontal === "left") {
      if (calendary.day.getMonth() - 1 < 0) {
        mouth = 11;
        year = year - 1;
      } else {
        mouth = mouth - 1;
      }

      setCalendary((state) => ({
        day: new Date(state.day.getFullYear(), state.day.getMonth() - 1, 1),
        dates: getDaysTheMouth(mouth, year),
        month: mouth,
        year: year,
      }));
    }
  };

  const handleSetDateCurrent = () => {
    setCalendary((state) => ({
      day: currentDay,
      dates: getDaysTheMouth(currentDay.getMonth(), currentDay.getFullYear()),
      month: currentDay.getMonth(),
      year: currentDay.getFullYear(),
    }));
  };

  return { currentDay, calendary, handleChangeCalendary, handleSetDateCurrent, handleChangeDate }
}