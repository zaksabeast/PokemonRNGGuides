import { StatInput, StatFields } from "~/components/statInput";
import { MinMaxStats } from "~/types/stat";
import { Translations } from "~/translations";

export const getStatFields = <FormState extends StatFields>(
  minMaxStats: MinMaxStats,
  t?: Translations,
) => [
  {
    label: t?.["HP"] ?? "HP",
    input: <StatInput<FormState> stat="hp" options={minMaxStats.hp} />,
  },
  {
    label: t?.["Atk"] ?? "Atk",
    input: <StatInput<FormState> stat="atk" options={minMaxStats.atk} />,
  },
  {
    label: t?.["Def"] ?? "Def",
    input: <StatInput<FormState> stat="def" options={minMaxStats.def} />,
  },
  {
    label: t?.["SpA"] ?? "SpA",
    input: <StatInput<FormState> stat="spa" options={minMaxStats.spa} />,
  },
  {
    label: t?.["SpD"] ?? "SpD",
    input: <StatInput<FormState> stat="spd" options={minMaxStats.spd} />,
  },
  {
    label: t?.["Spe"] ?? "Spe",
    input: <StatInput<FormState> stat="spe" options={minMaxStats.spe} />,
  },
];
