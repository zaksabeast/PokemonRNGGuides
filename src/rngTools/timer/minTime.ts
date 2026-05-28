const ONE_MINUTE_MS = 60_000;

export const toMinimumLength = ({
  min,
  ms,
}: {
  min: number;
  ms: number;
}): number => {
  if (ms >= min) {
    return ms;
  }

  return Math.ceil((min - ms) / ONE_MINUTE_MS) * ONE_MINUTE_MS + ms;
};
