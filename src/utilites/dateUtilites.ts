import { TimeType } from "ducks/route/types";

export const getDatesStrings = () => {
  const now = new Date();
  const currentDate = now.toISOString().substr(0, 10);
  const yesterday = new Date().setDate(now.getDate() - 1);
  const yesterdayDate = new Date(yesterday).toISOString().substr(0, 10);
  return { currentDate, yesterdayDate };
};

export const getDaysDelta = (str1: string, str2: string) => {
  const date1 = new Date(str1);
  const date2 = new Date(str2);
  const timeDelta = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDelta / (1000 * 60 * 60 * 24));
};

export const getHoursAndMinutes = (milliseconds: number): TimeType => {
  const hours = Math.floor(milliseconds / 3_600_000);
  const seconds = milliseconds % 3_600_000;
  const minutes = Math.floor(seconds / 60_000);
  return { hours, minutes };
};
