import { rngTools, Static3GeneratorResult, Species, Ivs } from "~/rngTools";
import {
  Field,
  FormikInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
  toDecimalString,
  toHexString,
} from "~/utils/number";
import React from "react";
import { match } from "ts-pattern";
import { getPkmFilterFields, PkmFilterFields } from "~/components/pkmFilter";

const columns: ResultColumn<Static3GeneratorResult>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  {
    title: "PID",
    dataIndex: "pid",
    key: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Nature", dataIndex: "nature", key: "nature" },
  { title: "Ability", dataIndex: "ability", key: "ability" },
  {
    title: "IVs",
    dataIndex: "ivs",
    key: "ivs",
    render: (ivs) =>
      ivs.hp.toString().padStart(2, "0") +
      "/" +
      ivs.atk.toString().padStart(2, "0") +
      "/" +
      ivs.def.toString().padStart(2, "0") +
      "/" +
      ivs.spa.toString().padStart(2, "0") +
      "/" +
      ivs.spd.toString().padStart(2, "0") +
      "/" +
      ivs.spe.toString().padStart(2, "0"),
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    key: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender", key: "gender" },
];

type Game = "emerald" | "rs" | "frlg";

const emeraldSpecies: Species[] = [
  "Chikorita",
  "Totodile",
  "Cyndaquil",
  "Treecko",
  "Mudkip",
  "Torchic",
  "Lileep",
  "Anorith",
  "Castform",
  "Beldum",
  "Wynaut",
  "Kecleon",
  "Voltorb",
  "Electrode",
  "Sudowoodo",
  "Regirock",
  "Regice",
  "Registeel",
  "Latias",
  "Latios",
  "Kyogre",
  "Groudon",
  "Rayquaza",
  "Mew",
  "Deoxys",
  "Lugia",
  "HoOh",
];

const rsSpecies: Species[] = [
  "Treecko",
  "Mudkip",
  "Torchic",
  "Lileep",
  "Anorith",
  "Castform",
  "Beldum",
  "Wynaut",
  "Kecleon",
  "Voltorb",
  "Electrode",
  "Regirock",
  "Regice",
  "Registeel",
  "Latias",
  "Latios",
  "Kyogre",
  "Groudon",
  "Rayquaza",
];

const frlgSpecies: Species[] = [
  "Bulbasaur",
  "Squirtle",
  "Charmander",
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Hitmonlee",
  "Hitmonchan",
  "Magikarp",
  "Lapras",
  "Eevee",
  "Togepi",
  "Abra",
  "Clefairy",
  "Scyther",
  "Dratini",
  "Porygon",
  "Pinsir",
  "Snorlax",
  "Electrode",
  "Hypno",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Mewtwo",
  "Deoxys",
  "Lugia",
  "HoOh",
  "Raikou",
  "Entei",
  "Suicune",
];

type FormState = {
  offset: DecimalString;
  seed: HexString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  tid: DecimalString;
  sid: DecimalString;
  species: Species;
  roamer: boolean;
  method4: boolean;
} & PkmFilterFields;

const minIvs: Ivs = {
  hp: 0,
  atk: 0,
  def: 0,
  spa: 0,
  spd: 0,
  spe: 0,
};

const maxIvs: Ivs = {
  hp: 31,
  atk: 31,
  def: 31,
  spa: 31,
  spd: 31,
  spe: 31,
};

const getGameSpecies = (game: Game) => {
  return match(game)
    .with("emerald", () => emeraldSpecies)
    .with("rs", () => rsSpecies)
    .with("frlg", () => frlgSpecies)
    .exhaustive();
};

const getInitialValues = (game: Game): FormState => {
  return {
    offset: toDecimalString(0),
    seed: toHexString(0),
    initial_advances: toDecimalString(100),
    max_advances: toDecimalString(1000),
    tid: toDecimalString(0),
    sid: toDecimalString(0),
    species: getGameSpecies(game)[0],
    roamer: false,
    method4: false,
    filter_shiny: false,
    filter_min_ivs: minIvs,
    filter_max_ivs: maxIvs,
    filter_nature: "None",
    filter_gender: "None",
    filter_ability: "None",
  };
};

const getFields = (game: Game): Field[] => {
  const staticSpecies = getGameSpecies(game);
  return [
    {
      label: "Seed",
      input: <FormikInput<FormState> name="seed" />,
    },
    {
      label: "TID",
      input: <FormikInput<FormState> name="tid" />,
    },
    {
      label: "SID",
      input: <FormikInput<FormState> name="sid" />,
    },
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={staticSpecies
            .sort((first, second) => first.localeCompare(second))
            .map((spec) => ({ label: spec, value: spec }))}
        />
      ),
    },
    {
      label: "Roamer",
      input: <FormikSwitch<FormState, "roamer"> name="roamer" />,
    },
    {
      label: "Method 4",
      input: <FormikSwitch<FormState, "method4"> name="method4" />,
    },
    {
      label: "Initial advances",
      input: <FormikInput<FormState> name="initial_advances" />,
    },
    {
      label: "Max advances",
      input: <FormikInput<FormState> name="max_advances" />,
    },
    {
      label: "Offset",
      input: <FormikInput<FormState> name="offset" />,
    },
    ...getPkmFilterFields(),
  ];
};

type Props = {
  game?: Game;
};

export const Static3Generator = ({ game = "emerald" }: Props) => {
  const [results, setResults] = React.useState<Static3GeneratorResult[]>([]);

  const fields = React.useMemo(() => getFields(game), [game]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const initialAdvances = fromDecimalString(opts.initial_advances);
      const maxAdvances = fromDecimalString(opts.max_advances);
      const seed = fromHexString(opts.seed);
      const offset = fromDecimalString(opts.offset);
      const tid = fromDecimalString(opts.tid);
      const sid = fromDecimalString(opts.sid);

      if (
        initialAdvances == null ||
        maxAdvances == null ||
        seed == null ||
        offset == null ||
        tid == null ||
        sid == null
      ) {
        return;
      }

      const results = await rngTools.gen3_static_generator_states({
        ...opts,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
        seed,
        offset,
        tid,
        sid,
        bugged_roamer: game !== "emerald" && opts.roamer,
        filter: {
          shiny: opts.filter_shiny,
          nature:
            opts.filter_nature === "None" ? undefined : opts.filter_nature,
          gender:
            opts.filter_gender === "None" ? undefined : opts.filter_gender,
          ability:
            opts.filter_ability === "None" ? undefined : opts.filter_ability,
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
        },
      });

      setResults(results);
    },
    [game],
  );

  return (
    <RngToolForm<FormState, Static3GeneratorResult>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_static"
    />
  );
};
