const getOffsetSymbol = (offset: number) => {
  if (offset > 0) {
    return "+";
  }
  if (offset < 0) {
    return "-";
  }
  return "";
};

export const formatOffset = (offset: number) => {
  return `${getOffsetSymbol(offset)}${Math.abs(offset)}`;
};
