/**
 * Converts a video frame number to a time string in the format of ~MM:SS.
 * Note: Video frame is not the same as an advance for all games.
 */
export const approximateGen3FrameTime = (frame: number) => {
  const fps = 60;
  const seconds = frame / fps;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `~${minutes}m ${remainingSeconds}s`;
};
