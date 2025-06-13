export const chunkRange = (
  [start, end]: [number, number],
  chunkSize: number,
) => {
  const chunks = [];
  for (let i = start; i < end; i += chunkSize) {
    chunks.push([i, Math.min(i + chunkSize, end)]);
  }
  return chunks;
};
