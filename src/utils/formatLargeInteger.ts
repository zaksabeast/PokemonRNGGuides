export const formatLargeInteger = (number: number) => {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatLargeIntegerWithSign = (number: number) => {
  return (number >= 0 ? "+" : "") + formatLargeInteger(number);
};
