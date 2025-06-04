import { rngTools, Gen4StaticOpts } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolSubmit,
} from "~/components";
import { getPkmFilterFields, pkmFilterSchema } from "~/components/pkmFilter";
import React from "react";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import {
  GameVersion,
  StaticEncounterId,
} from "~/rngToolsUi/gen4/static/constants";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

type Result = FlattenIvs<Gen4StaticOpts>;

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
    game: z.enum(GameVersion),
    encounter: z.enum(StaticEncounterId),
  })
  .merge(pkmFilterSchema);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
    seed: 0,
    tid: 0,
    sid: 0,
    game: GameVersion[0],
    encounter: StaticEncounterId[0],
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
          <FormikSelect<FormState, "species">
            name="species"
            options={StaticEncounterId}
          />
        ),
      },
        {
        label: "Game",
        input: (
          <FormikSelect<FormState, "">
            name="game"
            options={GameVersion}
          />
        ),
      },
       ...getPkmFilterFields(),
];

export const filter_4static; => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.filter_4static({
        ...opts,
        filter: {
          shiny: opts.filter_shiny,
          nature: opts.filter_nature,
          gender: opts.filter_gender,
          ability: opts.filter_ability,
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
          stats: null,
        },
      });

      setResults(results.map(flattenIvs));
    },
  );

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