export type EmeraldLang = "eng" | "fra" | "ita" | "spa" | "ger" | "jap";
export const emeraldLangs = [
  "eng",
  "fra",
  "ita",
  "spa",
  "ger",
] as const satisfies EmeraldLang[]; // TODO: Add support for jap

export const emeraldLangOptions = [
  { value: "eng", label: "English" } as const,
  { value: "fra", label: "French" } as const,
  { value: "ita", label: "Italian" } as const,
  { value: "spa", label: "Spanish" } as const,
  { value: "ger", label: "German" } as const,
];
