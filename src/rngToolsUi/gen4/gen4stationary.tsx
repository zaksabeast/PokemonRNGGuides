import { rngTools, Gen4StaticPokemon } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import {
  getPkmFilterFields,
  natureOptions,
  pkmFilterSchema,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { toOptions } from "~/utils/options";
import React from "react";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { startCase } from "lodash-es";
import {
  Gen4GameVersions,
  StaticEncounterSpecies,
  leadAbilities,
  getLeadAbility,
  characteristics,
  Characteristic4Options,
} from "~/rngToolsUi/gen4/gen4types";
import { nature } from "~/types/nature";
import { Translations } from "~/translations";

type Result = FlattenIvs<Gen4StaticPokemon>;
const GameVersionOpts = toOptions(Gen4GameVersions, startCase);
type StaticEncounterSpecies = keyof typeof StaticEncounterSpecies;
const StaticEncounterIdOpts = Object.entries(StaticEncounterSpecies).map(
  ([, value]) => ({ label: value, value }),
);

type FormState = z.infer<typeof Validator>;

type LeadAbilityOption = FormState["lead"];

const leadAbilitiesOpts: { label: string; value: LeadAbilityOption }[] = [
  { label: "None", value: "None" },
  { label: "Cute Charm (F)", value: "CutecharmF" },
  { label: "Cute Charm (M)", value: "CutecharmM" },
  {
    label: "Synchronize",
    value: "Synchronize",
  },
];

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
    render: (shiny: boolean) => (shiny ? "Yes" : "No"),
  },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "Advance",
    dataIndex: "advance",
    monospace: true,
  },
  {
    title: "Characteristics",
    dataIndex: "characteristic",
  },
];

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    initial_advances: z.number(),
    max_advances: z.number(),
    game: z.enum(Gen4GameVersions),
    encounter: z.enum(StaticEncounterSpecies),
    lead: z.enum(leadAbilities),
    synch_nature: z.enum(nature),
    filter_characteristic: z.enum(characteristics).nullable(),
  })
  .extend(pkmFilterSchema.shape);

const initialValues: FormState = {
  seed: 0,
  tid: 0,
  sid: 0,
  game: "Diamond",
  encounter: "Turtwig",
  lead: "None",
  synch_nature: "Hardy",
  initial_advances: 0,
  max_advances: 100,
  filter_characteristic: null,
  ...getPkmFilterInitialValues(),
};

const getFields = (_t: Translations, values: FormState) => {
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
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
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
        <FormikSelect<FormState, "game">
          name="game"
          options={GameVersionOpts}
        />
      ),
    },
    ...getPkmFilterFields(),
    {
      label: "Lead Ability",
      input: (
        <FormikSelect<FormState, "lead">
          name="lead"
          options={leadAbilitiesOpts}
        />
      ),
    },
    {
      label: "Characteristic",
      input: (
        <FormikSelect<FormState, "filter_characteristic">
          name="filter_characteristic"
          options={Characteristic4Options}
        />
      ),
    },
  ];
  if (values.lead === "Synchronize") {
    fields.push({
      label: "Synch Nature",
      input: (
        <FormikSelect<FormState, "synch_nature">
          name="synch_nature"
          options={natureOptions.required}
        />
      ),
    });
  }
  return fields;
};

export const Static4Generator = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_static4_states({
      seed: opts.seed,
      tid: opts.tid,
      sid: opts.sid,
      game: opts.game,
      encounter: opts.encounter,
      lead: getLeadAbility(opts),
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      filter: pkmFilterFieldsToRustInput(opts),
      filter_characteristic: opts.filter_characteristic,
    });

    setResults(results.map(flattenIvs));
  }, []);

  return (
    <RngToolForm<FormState, Result>
      getFields={getFields}
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="filter_4static"
    />
  );
};
