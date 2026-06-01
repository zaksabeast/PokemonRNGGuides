export type EmeraldLang = "Eng" | "Fra" | "Ita" | "Spa" | "Ger" | "Jap";
export const emeraldLangs = [
  "Eng",
  "Fra",
  "Ita",
  "Spa",
  "Ger",
] as const satisfies EmeraldLang[]; // TODO: Add support for jap

export const emeraldLangOptions = [
  { value: "Eng", label: "English" } as const,
  { value: "Fra", label: "French" } as const,
  { value: "Ita", label: "Italian" } as const,
  { value: "Spa", label: "Spanish" } as const,
  { value: "Ger", label: "German" } as const,
];
