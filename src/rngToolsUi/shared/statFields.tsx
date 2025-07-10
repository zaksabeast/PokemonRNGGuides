import { StatInput, StatFields } from "~/components/statInput";
import { LanguageKey } from "~/guides";
import { MinMaxStats } from "~/types/stat";
import { t } from "~/translations";

export const getStatFields = <FormState extends StatFields>(
  minMaxStats: MinMaxStats,
  language: LanguageKey = "en",
) => [
  {
    label: t("HP", language),
    input: <StatInput<FormState> stat="hp" options={minMaxStats.hp} />,
  },
  {
    label: t("Atk", language),
    input: <StatInput<FormState> stat="atk" options={minMaxStats.atk} />,
  },
  {
    label: t("Def", language),
    input: <StatInput<FormState> stat="def" options={minMaxStats.def} />,
  },
  {
    label: t("SpA", language),
    input: <StatInput<FormState> stat="spa" options={minMaxStats.spa} />,
  },
  {
    label: t("SpD", language),
    input: <StatInput<FormState> stat="spd" options={minMaxStats.spd} />,
  },
  {
    label: t("Spe", language),
    input: <StatInput<FormState> stat="spe" options={minMaxStats.spe} />,
  },
];
