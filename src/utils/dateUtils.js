function getMonthName(monthNumber) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber];
}

//export a function that takes a Date object and return a string in the format "Month day, hour:minute AM/PM"
export function getFormattedDate(date) {
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute < 10 ? "0" + minute : minute;
  return `${month} ${day}, ${formattedHour}:${formattedMinute} ${ampm}`;
}