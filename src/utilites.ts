export const getDatesStrings = () => {
  const now = new Date();
  const currentDate = now.toISOString().substr(0, 10);
  const yesterday = new Date().setDate(now.getDate() - 1);
  const yesterdayDate = new Date(yesterday).toISOString().substr(0, 10);
  return { currentDate, yesterdayDate };
};
