import React from "react";
import {
  FormikInput,
  ResultColumn,
  FormikSelect,
  IvInput,
  Field,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { rngTools, Ivs, Gen3PickupMethod, Egg3PickupState } from "~/rngTools";
import {
  HexString,
  DecimalString,
  fromDecimalString,
  toDecimalString,
  toHexString,
  fromHexString,
} from "~/utils/number";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";

type Result = FlattenIvs<Egg3PickupState>;

const columns: ResultColumn<Result>[] = [
  { title: "Advance", dataIndex: "advance", key: "advance" },
  ...ivColumns,
];

export type FormState = {
  delay: DecimalString;
  seed: HexString;
  initial_advances: DecimalString;
  max_advances: DecimalString;
  method: Gen3PickupMethod;
  parent1_ivs: Ivs;
  parent2_ivs: Ivs;
  filter_min_ivs: Ivs;
  filter_max_ivs: Ivs;
};

const initialValues: FormState = {
  delay: toDecimalString(3),
  seed: toHexString(0),
  initial_advances: toDecimalString(100),
  max_advances: toDecimalString(1000),
  method: "EmeraldBred",
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikInput<FormState> name="seed" />,
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
    label: "Delay",
    input: <FormikInput<FormState> name="delay" />,
  },
  {
    label: "Parent 1 IVs",
    input: <IvInput<FormState> name="parent1_ivs" />,
  },
  {
    label: "Parent 2 IVs",
    input: <IvInput<FormState> name="parent2_ivs" />,
  },
  {
    label: "Method",
    input: (
      <FormikSelect<FormState, "method">
        name="method"
        options={[
          { label: "Normal", value: "EmeraldBred" },
          { label: "Split", value: "EmeraldBredSplit" },
          { label: "Alternate", value: "EmeraldBredAlternate" },
        ]}
      />
    ),
  },
  {
    label: "Egg min IVs",
    input: <IvInput<FormState> name="filter_min_ivs" />,
  },
  {
    label: "Egg max IVs",
    input: <IvInput<FormState> name="filter_max_ivs" />,
  },
];

type Props = {
  lua?: boolean;
};

export const EmeraldPickupEgg = ({ lua = false }: Props) => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const initialAdvances = fromDecimalString(opts.initial_advances);
      const maxAdvances = fromDecimalString(opts.max_advances);
      const seed = fromHexString(opts.seed);
      const delay = fromDecimalString(opts.delay);

      if (
        initialAdvances == null ||
        maxAdvances == null ||
        seed == null ||
        delay == null
      ) {
        return;
      }

      const results = await rngTools.emerald_egg_pickup_states({
        ...opts,
        seed,
        delay,
        initial_advances: initialAdvances,
        max_advances: maxAdvances,
        parent_ivs: [opts.parent1_ivs, opts.parent2_ivs],
        lua_adjustment: lua,
        filter: {
          max_ivs: opts.filter_max_ivs,
          min_ivs: opts.filter_min_ivs,
        },
      });

      setResults(results.map(flattenIvs));
    },
    [lua],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      onSubmit={onSubmit}
      formContainerId="emerald_pickup_egg_form"
      submitTrackerId="generate_emerald_pickup_egg"
    />
  );
};
