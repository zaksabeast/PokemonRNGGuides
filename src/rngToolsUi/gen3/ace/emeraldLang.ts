export type EmeraldLang =
  | "English"
  | "French"
  | "Italian"
  | "Spanish"
  | "German"
  | "Japanese";
export const emeraldLangs = [
  "English",
  "French",
  "Italian",
  "Spanish",
  "German",
] as const satisfies EmeraldLang[];
