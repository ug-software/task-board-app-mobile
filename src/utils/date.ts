/** @format */

const formatInHours = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minuts = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minuts}`;
};

export { formatInHours };
