export const formatHex = (val: number, bytes = 4) => {
  return val
    .toString(16)
    .padStart(bytes * 2, "0")
    .toUpperCase();
};
