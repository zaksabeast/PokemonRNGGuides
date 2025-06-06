import { rngTools, Gen4SPokemon } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { getPkmFilterFields, pkmFilterSchema } from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import React from "react";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { startCase } from "lodash-es";
import {
  nature,
} from "~/types";

type Result = FlattenIvs<Gen4SPokemon>;

 const LeadAbilities = [
    "CutecharmF",
    "CutecharmM",
    "Synchronize",
    "None"
] as const;
const LeadAbilitiesOpts = toOptions(LeadAbilities, startCase);

 const GameVersion = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
 ] as const;
 const GameVersionOpts = toOptions(GameVersion, startCase);

 const  StaticEncounterId = [
  "Turtwig",
  "Chimchar",
  "Piplup",
  "Cyndaquil",
  "Chikorita",
  "Totodile",
  "Charmander",
  "Squirtle",
  "Bulbasaur",
  "Treecko",
  "Mudkip",
  "Torchic",
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Lileep",
  "Anorith",
  "Cranidos",
  "Shieldon",
  "Eevee",
  "Porygon",
  "Togepi",
  "Riolu",
  "Drifloon",
  "Spiritomb",
  "Rotom",
  "Lugia",
  "HoOh",
  "Dialga",
  "Palkia",
  "Giratina",
  "Regice",
  "Regirock",
  "Registeel",
  "Uxie",
  "Azelf",
  "Heatran",
  "Regigigas",
  "Mesprit",
  "Cresselia",
  "Zapdos",
  "Articuno",
  "Moltres",
  "Tentacool",
  "Dratini",
  "Tyrogue",
  "Mareep",
  "Wooper",
  "Slugma",
  "MrMime",
  "Abra",
  "Ekans",
  "Raikou",
  "Entei",
  "Suicune",
  "Voltorb",
  "Snorlax",
] as const;
 const StaticEncounterIdOpts = toOptions(StaticEncounterId, startCase);

const columns: ResultColumn<Result>[] = [
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  ...ivColumns,
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "Advance",
    dataIndex: "advance",
    monospace: true,
  },
];

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    initial_advances: z.number(),
    max_advances: z.number(),
    game: z.enum(GameVersion).nullable(),
    encounter: z.enum(StaticEncounterId).nullable(),
    lead: z.enum(LeadAbilities).nullable(),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  tid: 0,
  sid: 0,
  game: "Diamond",
  encounter: "Turtwig",
  lead: "None",
  initial_advances: 0,
  max_advances: 100,
  filter_shiny: false,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_nature: null,
  filter_gender: null,
  filter_ability: null,
};
const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "SID",
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
  {
    label: "Initial Advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max Advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Species",
    input: (
      <FormikSelect<FormState, "encounter">
        name="encounter"
        options={StaticEncounterIdOpts}
      />
    ),
  },
  {
    label: "Game",
    input: (
      <FormikSelect<FormState, "game"> name="game" options={GameVersionOpts} />
    ),
  },
  {
    label: "Lead Ability",
    input: (
      <FormikSelect<FormState, "lead"> name="lead" options={LeadAbilitiesOpts} />
    ),
  },
  ...getPkmFilterFields(),
];

export const Filter_4static = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.filter_4static({
      tid: opts.tid,
      sid: opts.sid,
      game:opts.game,
      encounter:opts.encounter,
      lead:opts.lead,
      initial_advances:opts.initial_advances,
      max_advances:opts.max_advances,
      filter: {
        shiny: opts.filter_shiny,
        nature: opts.filter_nature,
        gender: opts.filter_gender,
        ability: opts.filter_ability,
        min_ivs: opts.filter_min_ivs,
        max_ivs: opts.filter_max_ivs,
        stats: null,
      }
    }, opts.seed,);

    setResults(results.map(flattenIvs));
  }, []);

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="filter_4static"
    />
  );
};
