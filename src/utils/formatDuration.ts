export const formatDuration = (seconds: number) => {
  const durInMinutes = seconds / 60;
  if (durInMinutes < 1000) {
    return `~${durInMinutes.toFixed(1)} min`;
  }

  const durInHours = durInMinutes / 60;
  return `~${durInHours.toFixed(0)} h`;
};

export const formatMinutesAndSeconds = (seconds: number) => {
  if (seconds < 60) {
    return `~${seconds.toFixed(1)} s`;
  }
  const totalSeconds = Math.round(seconds);
  return `~${Math.floor(totalSeconds / 60)} min ${totalSeconds % 60} s`;
};
