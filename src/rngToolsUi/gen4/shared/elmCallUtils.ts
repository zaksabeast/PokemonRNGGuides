export const sanitizeElmCalls = (value: string): string => {
  return value
    .toUpperCase()
    .replace(/[^EKP,\s]/g, "")
    .replace(/\s+/g, "")
    .replace(/,+/g, ",")
    .replace(/^,|,$/g, "");
};

export const matchesElmCallFilter = (
  elmCalls: string[],
  filter: string,
): boolean => {
  const sanitized = sanitizeElmCalls(filter);

  if (sanitized.length === 0) {
    return true;
  }

  const expected = sanitized.split(",");

  return expected.every((call, i) => elmCalls[i] === call);
};
