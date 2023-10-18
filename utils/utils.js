export function formatTime(time) {
  let date = new Date(time);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
}
