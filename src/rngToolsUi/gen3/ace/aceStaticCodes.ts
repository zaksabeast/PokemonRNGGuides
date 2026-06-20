import { EmeraldLang, Species } from "~/rngTools";

const boxesByLanguage = {
  English: [[0]],
  French: [[0]],
  Italian: [[0]],
  Spanish: [[0]],
  German: [[0]],
  Japanese: [[0]],
} satisfies Record<EmeraldLang, number[][]>;

export const aceCodes: {
  speciesList: Species[];
  roaming: boolean;
  actions: {
    value: "Respawn" | "Access";
    label: string;
    boxesByLanguage: typeof boxesByLanguage;
  }[];
}[] = [
  {
    speciesList: ["Chikorita", "Totodile", "Cyndaquil"],
    roaming: false,
    actions: [
      { value: "Respawn", label: "Respawn", boxesByLanguage },
      { value: "Access", label: "Get Eon Ticket", boxesByLanguage },
    ],
  },
  {
    speciesList: ["Mudkip", "Torchic", "Treecko"],
    roaming: false,
    actions: [{ value: "Respawn", label: "Respawn", boxesByLanguage }],
  },
];
