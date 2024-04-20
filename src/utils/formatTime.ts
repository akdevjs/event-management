const formatTime = (inputTime: string): string => {
  const date = new Date(inputTime);

  // Get hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Determine AM/PM
  const amPm = hours < 12 ? "AM" : "PM";

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}${amPm}`;
};

export default formatTime;
