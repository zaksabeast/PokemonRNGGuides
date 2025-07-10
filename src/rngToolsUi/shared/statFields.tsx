import { StatInput, StatFields } from "~/components/statInput";
import { LanguageKey } from "~/guides";
import { MinMaxStats } from "~/types/stat";
import { createTranslator, Translations } from "~/utils/siteLanguage";

const englishTranslations = {
  HP: "HP",
  ATK: "ATK",
  DEF: "DEF",
  SPA: "SPA",
  SPD: "SPD",
  SPE: "SPE",
} as const;

const translations = {
  en: englishTranslations,
  es: englishTranslations,
  zh: englishTranslations,
  fr: englishTranslations,
  it: {
    HP: "PS",
    ATK: "ATT",
    DEF: "DIF",
    SPA: "ATT SP",
    SPD: "DIF SP",
    SPE: "VEL",
  },
} as const satisfies Translations<typeof englishTranslations>;

const t = createTranslator(translations);

export const getStatFields = <FormState extends StatFields>(
  minMaxStats: MinMaxStats,
  language: LanguageKey = "en",
) => [
  {
    label: t("HP", language),
    input: <StatInput<FormState> stat="hp" options={minMaxStats.hp} />,
  },
  {
    label: t("ATK", language),
    input: <StatInput<FormState> stat="atk" options={minMaxStats.atk} />,
  },
  {
    label: t("DEF", language),
    input: <StatInput<FormState> stat="def" options={minMaxStats.def} />,
  },
  {
    label: t("SPA", language),
    input: <StatInput<FormState> stat="spa" options={minMaxStats.spa} />,
  },
  {
    label: t("SPD", language),
    input: <StatInput<FormState> stat="spd" options={minMaxStats.spd} />,
  },
  {
    label: t("SPE", language),
    input: <StatInput<FormState> stat="spe" options={minMaxStats.spe} />,
  },
];
