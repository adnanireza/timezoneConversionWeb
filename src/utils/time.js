const isTimeValid = time => time instanceof Date && !isNaN(time);
const embedDateInTime = (time, date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};
const embedTimeInDate = (date, time) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};
const timeIncBySec = (time, diff) => {
  return new Date(time.getTime() + diff * 1000);
};
const isOverflow = (time, diff) => {
  return time.getHours() * 3600 + time.getMinutes() * 60 + diff >= 24 * 3600;
};
const isUnderflow = (time, diff) => {
  return time.getHours() * 3600 + time.getMinutes() * 60 + diff < 0;
};
const time2UnixConv = time => Math.floor(time.getTime() / 1000);

export {
  isTimeValid,
  embedDateInTime,
  embedTimeInDate,
  timeIncBySec,
  isOverflow,
  isUnderflow,
  time2UnixConv
};
