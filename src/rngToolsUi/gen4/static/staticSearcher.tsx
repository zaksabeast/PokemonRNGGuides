import React from "react";
import { match } from "ts-pattern";
import { uniqueId } from "lodash-es";
import {
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  Button,
} from "~/components";
import { toOptions } from "~/utils/options";
import {
  multiWorkerRngTools,
  Static4State,
  SearchStatic4Opts,
  Species,
  Static4LeadInput,
} from "~/rngTools";
import { z } from "zod";
import {
  getPkmFilterFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { Gen4GameVersion } from "../gen4types";
import { useStatic4State } from "./state";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { useCurrentStep } from "~/components/stepper/state";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { UndefinedToNull } from "~/types";
import { chunkIvs } from "~/utils/chunkIvs";

type Result = FlattenIvs<
  Static4State["state"] & {
    seed_time: Static4State["seed_time"];
    key: string;
    second: number;
    seed: number;
    delay: number;
  }
>;

type GiratinaOrigin = "Giratina (Origin Form)";
type GiratinaAlternate = "Giratina (Alternate Form)";
type G4Species = Species | GiratinaOrigin | GiratinaAlternate;

const CommonDpptSpecies = [
  // Fossils
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Lileep",
  "Anorith",
  "Cranidos",
  "Shieldon",

  // Gifts
  "Eevee",
  "Riolu",

  // Stationary
  "Drifloon",
  "Rotom",
  "Spiritomb",

  // Legends
  "Uxie",
  "Azelf",
  "Heatran",
  "Regigigas",

  // Events
  "Manaphy",
] as const satisfies G4Species[];

const DiamondSpecies = (
  [
    ...CommonDpptSpecies,

    // Gifts
    "Happiny",

    // Legends
    "Dialga",
    "Giratina (Alternate Form)",
  ] as const satisfies G4Species[]
).sort();

const PearlSpecies = (
  [
    ...CommonDpptSpecies,

    // Gifts
    "Happiny",

    // Legends
    "Palkia",
    "Giratina (Alternate Form)",
  ] as const satisfies G4Species[]
).sort();

const PlatinumSpecies = (
  [
    ...CommonDpptSpecies,

    // Gifts
    "Porygon",
    "Togepi",

    // Legends
    "Dialga",
    "Palkia",
    "Regirock",
    "Regice",
    "Registeel",
    "Giratina (Alternate Form)",
    "Giratina (Origin Form)",

    // Events
    "Darkrai",
    "Shaymin",
  ] as const satisfies G4Species[]
).sort();

const CommonHgSsSpecies = [
  // Fossils
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Lileep",
  "Anorith",
  "Cranidos",
  "Shieldon",
  "Tentacool",

  // Gifts
  "Tentacool",
  "Eevee",
  "Dratini",
  "Tyrogue",
  "Mareep",
  "Wooper",
  "Slugma",

  // Game Corner
  "MrMime",
  "Porygon",
  "Abra",
  "Ekans",
  // Eevee
  // Dratini

  // Stationary
  "Voltorb",
  "Geodude",
  "Koffing",
  "Gyarados",
  "Lapras",
  "Electrode",
  "Snorlax",
  "Sudowoodo",

  // Legends
  "Articuno",
  "Zapdos",
  "Moltres",
  "Mewtwo",
  "Suicune",
  "Lugia",
  "HoOh",
  "Latios",
  "Kyogre",
  "Rayquaza",
  "Dialga",
  "Palkia",
  "Giratina (Origin Form)",

  // Events
  "Manaphy",
] as const satisfies G4Species[];

const HeartGoldSpecies = (
  [
    ...CommonHgSsSpecies,
    "Ekans",
    "Latios",
    "Kyogre",
  ] as const satisfies G4Species[]
).sort();

const SoulSilverSpecies = (
  [
    ...CommonHgSsSpecies,
    "Sandshrew",
    "Latias",
    "Groudon",
  ] as const satisfies G4Species[]
).sort();

const DiamondSpeciesSchema = z.enum(DiamondSpecies);
const PearlSpeciesSchema = z.enum(PearlSpecies);
const PlatinumSpeciesSchema = z.enum(PlatinumSpecies);
const HeartGoldSpeciesSchema = z.enum(HeartGoldSpecies);
const SoulSilverSpeciesSchema = z.enum(SoulSilverSpecies);

const SpeciesSchema = DiamondSpeciesSchema.or(PearlSpeciesSchema)
  .or(PlatinumSpeciesSchema)
  .or(HeartGoldSpeciesSchema)
  .or(SoulSilverSpeciesSchema);

type Static4Species = z.infer<typeof SpeciesSchema>;

type SelectButtonProps = {
  target: Result;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useStatic4State();
  return (
    <Button
      trackerId="select_gen4_static"
      onClick={() => {
        setState((prev) => ({ ...prev, target }));
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const LeadOptions = [
  "None",
  "CutecharmF",
  "CutecharmM",
  "Synchronize",
] as const satisfies Static4LeadInput[];

const LeadOptionsSchema = z.enum(LeadOptions);

const Validator = z
  .object({
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    species: SpeciesSchema,
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    year: z.number().int().min(2000).max(2100),
    lead: LeadOptionsSchema,
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
  sid: 0,
  year: 2000,
  species: "Abra",
  min_delay: 800,
  max_delay: 810,
  min_advance: 0,
  max_advance: 100,
  force_second: null,
  lead: "None",
  ...getPkmFilterInitialValues(),
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "key",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Gender", dataIndex: "gender" },
  ...ivColumns,
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Advance", dataIndex: "advance" },
  { title: "Delay", dataIndex: "delay" },
  {
    title: "Second",
    dataIndex: "second",
  },
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).padStart(8, "0").toUpperCase(),
  },
];

const leadOptions = [
  { label: "No Lead", value: "None" },
  { label: "Cute Charm (Female)", value: "CutecharmF" },
  { label: "Cute Charm (Male)", value: "CutecharmM" },
  { label: "Synchronize", value: "Synchronize" },
] satisfies { label: string; value: Static4LeadInput }[];

const getFields = (game: Gen4GameVersion) => {
  const species = match(game)
    .with("Diamond", () => DiamondSpecies)
    .with("Pearl", () => PearlSpecies)
    .with("Platinum", () => PlatinumSpecies)
    .with("HeartGold", () => HeartGoldSpecies)
    .with("SoulSilver", () => SoulSilverSpecies)
    .exhaustive();

  return [
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: "Year",
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: "Min Delay",
      input: (
        <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
      ),
    },
    {
      label: "Max Delay",
      input: (
        <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
      ),
    },
    {
      label: "Min Advance",
      input: (
        <FormikNumberInput<FormState> name="min_advance" numType="decimal" />
      ),
    },
    {
      label: "Max Advance",
      input: (
        <FormikNumberInput<FormState> name="max_advance" numType="decimal" />
      ),
    },
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(species)}
        />
      ),
    },
    {
      label: "Lead",
      input: (
        <FormikSelect<FormState, "lead"> name="lead" options={leadOptions} />
      ),
    },
    ...getPkmFilterFields(),
    {
      label: "Force Second",
      input: (
        <FormikNumberInput<FormState> name="force_second" numType="decimal" />
      ),
    },
  ];
};

const mapResult = (res: Static4State): Result => {
  const { state, seed_time } = res;
  return {
    ...flattenIvs(state),
    seed_time,
    key: uniqueId(),
    second: seed_time.datetime.second,
    seed: seed_time.seed,
    delay: seed_time.delay,
  };
};

export const Static4Searcher = () => {
  const [state] = useStatic4State();
  const game = state.game;

  const {
    run: searchStaticSeeds,
    data: results,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_static4, {
    map: mapResult,
  });

  const onSubmit = React.useCallback(
    async (opts: FormState) => {
      const formattedSpecies = match<Static4Species, Species>(opts.species)
        .with("Giratina (Origin Form)", () => "Giratina")
        .with("Giratina (Alternate Form)", () => "Giratina")
        .otherwise((spec) => spec);

      const baseOpts: UndefinedToNull<SearchStatic4Opts> = {
        filter: pkmFilterFieldsToRustInput(opts),
        force_second: opts.force_second,
        max_advance: opts.max_advance,
        min_advance: opts.min_advance,
        max_delay: opts.max_delay,
        min_delay: opts.min_delay,
        sid: opts.sid,
        species: formattedSpecies,
        tid: opts.tid,
        year: opts.year,
        lead: opts.lead,
        game,
      };
      const chunkedIvs = chunkIvs(opts.filter_min_ivs, opts.filter_max_ivs);
      const searchOpts = chunkedIvs.map(([minIvs, maxIvs]) => ({
        ...baseOpts,
        filter: {
          ...baseOpts.filter,
          min_ivs: minIvs,
          max_ivs: maxIvs,
        },
      }));

      await searchStaticSeeds(searchOpts);
    },
    [game, searchStaticSeeds],
  );

  const fields = React.useMemo(() => getFields(game), [game]);

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_static"
      allowCancel
      cancelTrackerId="cancel_gen4_static"
      onCancel={cancel}
    />
  );
};
