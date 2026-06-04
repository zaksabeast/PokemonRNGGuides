export const minutesBefore = (millis: number[]): number => {
  const ms = millis.reduce((acc, val) => acc + val, 0);
  return Math.floor(ms / 60000);
};
