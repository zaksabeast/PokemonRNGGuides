export const chunkRange = (
  [start, end]: [number, number],
  chunkSize: number,
): [number, number][] => {
  if (start === end) {
    return [[start, end]];
  }

  const chunks: [number, number][] = [];
  for (let i = start; i < end; i += chunkSize) {
    chunks.push([i, Math.min(i + chunkSize, end)]);
  }
  return chunks;
};
