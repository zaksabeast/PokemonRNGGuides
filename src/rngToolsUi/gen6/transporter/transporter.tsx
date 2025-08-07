import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikSelect,
} from "~/components";
import { rngTools, Stationary6State } from "~/rngTools";
import {
  flattenIvs,
  FlattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import {
  getPkmFilterFields,
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";
import { Translations } from "~/translations";

const transporterGenders = ["NoGender", "RandomGender", "Mythical"] as const;
const transporterGenderOptions = toOptions(transporterGenders, startCase);
type Result = FlattenIvs<Stationary6State>;

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["RNG State"],
    dataIndex: "rng_state",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: t["PSV"],
    dataIndex: "psv",
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny) => (shiny ? "Yes" : "No"),
  },
  ...getIvColumns(t),
  {
    title: t["Ability"],
    dataIndex: "ability",
  },
  {
    title: t["Nature"],
    dataIndex: "nature",
  },
  {
    title: t["Gender"],
    dataIndex: "gender",
  },
];

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    initial_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    delay: z.number().int(),
    tsv: z.number().int(),
    only_current_seed: z.boolean(),
    transporter_genders: z.enum(transporterGenders),
  })
  .extend(pkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  initial_advances: 20,
  max_advances: 50,
  delay: 100,
  tsv: 0,
  only_current_seed: false,
  transporter_genders: "NoGender",
  ...getPkmFilterInitialValues(),
};

const getFields = (t: Translations): Field[] => [
  {
    label: t["Seed"],
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: t["Initial Advance"],
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: t["Max Advances"],
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: t["Delay"],
    input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
  },
  {
    label: t["TSV"],
    input: <FormikNumberInput<FormState> name="tsv" numType="decimal" />,
  },
  {
    label: t["Transporter Gender"],
    input: (
      <FormikSelect<FormState, "transporter_genders">
        name="transporter_genders"
        options={transporterGenderOptions}
      />
    ),
  },
  ...getPkmFilterFields(
    {
      ivs: true,
      ability: false,
      gender: false,
      nature: false,
      shiny: false,
    },
    t,
  ),
];

export const Transporter = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.generate_transporter({
      seed: opts.seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      delay: opts.delay,
      target: 0,
      transporter_genders: [opts.transporter_genders],
      tsv: opts.tsv,
      filter: {
        gender: null,
        ability: null,
        nature: null,
        ivs: {
          min_ivs: opts.filter_min_ivs,
          max_ivs: opts.filter_max_ivs,
        },
        shiny: false,
      },
    });

    setResults(results.map(flattenIvs));
  }, []);

  return (
    <RngToolForm<FormState, Result>
      getFields={getFields}
      getColumns={getColumns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_transporter"
    />
  );
};
