import { EmeraldLang } from "~/rngTools";

export const emeraldLangs = [
  "English",
  "French",
  "Italian",
  "Spanish",
  "German",
  // Japanese isn't support yet.
] as const satisfies EmeraldLang[];
