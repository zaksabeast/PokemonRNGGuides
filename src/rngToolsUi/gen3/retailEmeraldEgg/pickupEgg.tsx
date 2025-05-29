import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  IvInput,
  Field,
  RngToolForm,
  RngToolSubmit,
  Button,
} from "~/components";
import { rngTools, Egg3PickupState, Gen3PickupMethod } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  inheritedIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import {
  IvsSchema,
  NullableIvs,
  NullableIvsSchema,
} from "~/components/ivInput";
import { HexSchema } from "~/utils/number";
import { usePickupEggState } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import pmap from "p-map";
import { sortBy, startCase } from "lodash-es";
import { approximateGen3FrameTime } from "~/utils/approximateGen3FrameTime";
import { ivMethods } from "./constants";

type Result = FlattenIvs<
  Egg3PickupState & { method: Gen3PickupMethod; key: string }
>;

const SelectButton = ({ result }: { result: Result }) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setPickupEggState] = usePickupEggState();
  return (
    <Button
      trackerId="select_retail_emerald_pickup_egg"
      onClick={() => {
        setPickupEggState((prev) => ({
          ...prev,
          targetAdvance: result.advance,
          targetMethod: result.method,
        }));
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "advance",
    render: (_, result) => <SelectButton result={result} />,
  },
  { title: "Time", dataIndex: "advance", render: approximateGen3FrameTime },
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => startCase(method),
  },
  ...inheritedIvColumns,
];

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  parent1_ivs: NullableIvsSchema,
  parent2_ivs: NullableIvsSchema,
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  initial_advances: 1000,
  max_advances: 10000,
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
};

const fields: Field[] = [
  {
    label: "Seed",
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: "Initial advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Parent 1 IVs",
    input: <IvInput<FormState, "nullable"> name="parent1_ivs" />,
  },
  {
    label: "Parent 2 IVs",
    input: <IvInput<FormState, "nullable"> name="parent2_ivs" />,
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

export const RetailEmeraldPickupEgg = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [, setPickupEggState] = usePickupEggState();

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const parentIvs: [NullableIvs, NullableIvs] = [
        opts.parent1_ivs,
        opts.parent2_ivs,
      ];
      const methodResults = await pmap(
        ivMethods,
        async (method) => {
          const spreads = await rngTools.emerald_egg_pickup_states({
            ...opts,
            delay: 0,
            method,
            parent_ivs: parentIvs,
            lua_adjustment: true,
            filter: {
              max_ivs: opts.filter_max_ivs,
              min_ivs: opts.filter_min_ivs,
            },
          });
          return spreads.map((spread) =>
            flattenIvs({
              ...spread,
              method,
              key: `${method}-${spread.advance}`,
            }),
          );
        },
        { concurrency: 3 },
      );

      const flattenedResults = methodResults.flat();
      const sortedResults = sortBy(
        flattenedResults,
        (result) => result.advance,
      );

      setResults(sortedResults);
      setPickupEggState((prev) => ({ ...prev, seed: opts.seed, parentIvs }));
    },
    [setPickupEggState],
  );

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="retail_emerald_pickup_egg_form"
      submitTrackerId="generate_retail_emerald_pickup_egg"
      rowKey="key"
    />
  );
};
