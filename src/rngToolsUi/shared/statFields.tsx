import { StatInput, StatFields } from "~/components/statInput";
import { MinMaxStats } from "~/types/stat";

export const getStatFields = <FormState extends StatFields>(
  minMaxStats: MinMaxStats,
) => [
  {
    label: "HP",
    input: <StatInput<FormState> stat="hp" options={minMaxStats.hp} />,
  },
  {
    label: "ATK",
    input: <StatInput<FormState> stat="atk" options={minMaxStats.atk} />,
  },
  {
    label: "DEF",
    input: <StatInput<FormState> stat="def" options={minMaxStats.def} />,
  },
  {
    label: "SPA",
    input: <StatInput<FormState> stat="spa" options={minMaxStats.spa} />,
  },
  {
    label: "SPD",
    input: <StatInput<FormState> stat="spd" options={minMaxStats.spd} />,
  },
  {
    label: "SPE",
    input: <StatInput<FormState> stat="spe" options={minMaxStats.spe} />,
  },
];
