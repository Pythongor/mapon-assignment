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
