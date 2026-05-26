export const GEN5_GAMES = ["Black", "White", "Black2", "White2"] as const;
export type Gen5Game = (typeof GEN5_GAMES)[number];

export const GEN5_LANGUAGE = [
  "English",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Spanish",
] as const;
export type Gen5Language = (typeof GEN5_LANGUAGE)[number];

export const DS_TYPE = ["DS", "DSi", "DS3"] as const;
export type DsType = (typeof DS_TYPE)[number];

export const GEN5_BUTTONS = [
  "R",
  "L",
  "X",
  "Y",
  "A",
  "B",
  "Select",
  "Start",
  "Right",
  "Left",
  "Up",
  "Down",
] as const;
export type Gen5Button = (typeof GEN5_BUTTONS)[number];
