import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  FormikInput,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { rngTools, TransporterOpts, Stationary6State } from "~/rngTools";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

export const TransporterGenderEnum = z.enum([
  "NoGender",
  "RandomGender",
  "Mythical",
]);

const columns: ResultColumn<Stationary6State>[] = [
  {
    title: "Advance",
    dataIndex: "advance",
  },
  {
    title: "RNG State",
    dataIndex: "rng_state",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "PSV",
    dataIndex: "psv",
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  {
    title: "IVs",
    dataIndex: "ivs",
    monospace: true,
    render: (ivs) =>
      [ivs.hp, ivs.atk, ivs.def, ivs.spa, ivs.spd, ivs.spe].join(" / "),
  },
  {
    title: "Ability",
    dataIndex: "ability",
  },
  {
    title: "Nature",
    dataIndex: "nature",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
];

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  delay: z.number().int(),
  target: z.number().int(),
  tsv: z.number().int(),
  only_current_seed: z.boolean(),
  transporter_genders: z.array(TransporterGenderEnum),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  initial_advances: 20,
  max_advances: 50,
  delay: 100,
  target: 0,
  tsv: 0,
  only_current_seed: false,
  transporter_genders: ["NoGender"],
};

const genderOptions = [
  { label: "No Gender", value: "NoGender" },
  { label: "Random", value: "RandomGender" },
  { label: "Mythical", value: "Mythical" },
] as const;

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "Initial Advance",
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
    label: "Delay",
    input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
  },
  {
    label: "Target",
    input: <FormikNumberInput<FormState> name="target" numType="decimal" />,
  },
  {
    label: "TSV",
    input: <FormikNumberInput<FormState> name="tsv" numType="decimal" />,
  },
  {
    label: "Transporter Gender",
    input: (
      <FormikSelect<FormState, "transporter_genders">
        name="transporter_genders"
        options={["Nogender", "RandomGender", "Mythical"]}
      />
    ),
  },
];

export const transporter = () => {
  const [results, setResults] = React.useState<Stationary6State[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_transporter({
      seed: opts.seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      delay: opts.delay,
      target: opts.target,
      transporter_genders: opts.transporter_genders,
      tsv: opts.tsv,
      filter: {
        gender: null,
        ability: null,
        nature: null,
        ivs: null,
        shiny: false,
      },
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, Stationary6State>
      fields={fields}
      columns={columns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_transporter"
    />
  );
};
