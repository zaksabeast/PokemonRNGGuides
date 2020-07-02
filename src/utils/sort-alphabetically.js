export const sortAlphabetically = (first, second) => {
  if (first > second) return 1;
  if (second > first) return -1;
  return 0;
};
