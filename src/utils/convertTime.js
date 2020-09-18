export function toMinutes(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.ceil(totalSeconds % 60);
  if (seconds < 0) seconds = 0;
  if(seconds< 10) seconds = `0${seconds}`
  return `${minutes >= 0 ? minutes : 0}:${seconds}`;
}
