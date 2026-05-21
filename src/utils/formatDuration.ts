export const formatDuration = (seconds: number) => {
  const durInMinutes = seconds / 60;
  if (durInMinutes < 1000) {
    return `~${durInMinutes.toFixed(1)} min`;
  }

  const durInHours = durInMinutes / 60;
  return `~${durInHours.toFixed(0)} h`;
};
