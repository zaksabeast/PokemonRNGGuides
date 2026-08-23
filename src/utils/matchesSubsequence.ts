export const matchesSubsequence = <T>(
  values: readonly T[],
  pattern: readonly T[],
): boolean => {
  if (pattern.length === 0) {
    return true;
  }

  for (let i = 0; i <= values.length - pattern.length; i++) {
    let match = true;

    for (let j = 0; j < pattern.length; j++) {
      if (values[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      return true;
    }
  }

  return false;
};
