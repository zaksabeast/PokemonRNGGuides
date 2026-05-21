export const formatProbability = (prob: number) => {
  if (prob <= 0) {
    return "0%";
  }
  if (prob >= 1) {
    return "100%";
  }

  if (prob < 1e-30) {
    return "~0%";
  }
  const val = prob * 100;
  if (prob > 0.1) {
    return `${val.toFixed(1)}%`;
  }

  // Ensure at least 2-digits precision (ex: 0.0096%)
  const valLog10 = Math.log10(val);
  return `${val.toFixed(-Math.floor(valLog10) + 1)}%`;
};
