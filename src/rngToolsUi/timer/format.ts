export const formatSeconds = (ms: number) => (ms / 1000).toFixed(3);

/** Formats remaining time as the timer's SS:mmm readout */
export const formatTimerReadout = (ms: number) => {
  const flooredMs = Math.floor(ms);
  const seconds = Math.floor(flooredMs / 1000);
  const milliseconds = flooredMs % 1000;
  return `${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
};

export const formatDuration = (ms: number) => {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
