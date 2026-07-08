export const chunkRange = (
  [start, end]: [number, number],
  chunkSize: number,
): [number, number][] => {
  const chunks: [number, number][] = [];

  if (chunkSize === 0) {
    return [];
  }

  let i = start;
  while (i <= end) {
    const chunkEnd = Math.min(i + chunkSize - 1, end);
    chunks.push([i, chunkEnd]);
    i = chunkEnd + 1;
  }

  return chunks;
};
