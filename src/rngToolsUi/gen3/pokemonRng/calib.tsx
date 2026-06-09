
export type CalibOffset = {
  offset: number; // between pressing A and reaching RNG manip start function.
  calibNoBattleVideo: number; // non-vblank advances between booting and triggering RNG manip start function. exact number depends on map encounter table and dynamic actors.
  calibBattleVideo: number; // non-vblank advances between watching battle video and triggering RNG manip start function.
};