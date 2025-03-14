/** @format */

import { calendary } from "@/src/constants";

const formatInHours = (date: Date) => {  
  const hours = String(date.getHours()).padStart(2, "0");
  const minuts = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minuts}`;
};

const getNumberOfDaysInTheMonth = (mouth: number, year: number) => {
  try {
    return new Date(year, mouth + 1, 0).getDate();
  } catch (ex) {
    return 0;
  }
};

export interface DateTime {
  day: number;
  month: number;
  year: number;
  dayOfTheWeek: {
    abbreviated: string;
    full: string;
  };
}

const getDaysTheMouth = (mouth: number, year: number): DateTime[] => {
  var quantity = new Date(year, mouth + 1, 0).getDate();
  var days = Array.from({ length: quantity }).map((_, index) => {
    var day = new Date(year, mouth, index + 1);
    return {
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear(),
      //@ts-ignore
      dayOfTheWeek: calendary.week[day.getDay()],
    } as DateTime;
  });

  return days;
};

function getNumberOfDaysBetweenTwoDates(initial: Date, final: Date) {
  // Converte as datas para objetos Date, caso não sejam
  const dateInitial = new Date(initial);
  const dateFinal = new Date(final);

  const diff = Math.abs(dateFinal .getTime()- dateInitial.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return days;
}

function getNumberOfMinutesBetweenTwoDates(initial: Date, final: Date) {
  // Converte as datas para objetos Date, caso não sejam
  const dateInitial = new Date(initial);
  const dateFinal = new Date(final);

  const diff = Math.abs(dateFinal .getTime()- dateInitial.getTime());
  const minutes = Math.floor(diff / (1000 * 60));

  return minutes;
}

function getNumberOfSecondsBetweenTwoDates(initial: Date, final: Date) {
  // Converte as datas para objetos Date, caso não sejam
  const dateInitial = new Date(initial);
  const dateFinal = new Date(final);

  const diff = Math.abs(dateFinal .getTime()- dateInitial.getTime());
  const seconds = Math.floor(diff / 1000);

  return seconds;
}

export { formatInHours, getNumberOfDaysInTheMonth, getDaysTheMouth, getNumberOfDaysBetweenTwoDates, getNumberOfMinutesBetweenTwoDates, getNumberOfSecondsBetweenTwoDates };
