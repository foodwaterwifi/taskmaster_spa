export function MinutesToTimeString(m) {
  let minutes = (m % 60);
  let hours = (Math.floor(m/60) % 60);
  let days = Math.floor(m/3600);

  let minutesS = minutes.toString() + "m";
  let hoursS = hours.toString() + "h";
  let daysS = days.toString() + "d";

  if (days > 0) {
    return daysS + " " + hoursS + " " + minutesS;
  }
  else if (hours > 0) {
    return hoursS + " " + minutesS;
  }
  else {
    return minutesS;
  }
}
