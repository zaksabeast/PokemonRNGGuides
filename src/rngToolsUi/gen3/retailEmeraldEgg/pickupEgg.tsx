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
import { rngTools, Egg3PickupState, Ivs, Gen3PickupMethod } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { IvSchema } from "~/components/ivInput";
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

const SelectButton = ({ targetAdvance }: { targetAdvance: number }) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setPickupEggState] = usePickupEggState();
  return (
    <Button
      trackerId="select_retail_emerald_pickup_egg"
      onClick={() => {
        setPickupEggState((prev) => ({ ...prev, targetAdvance }));
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
    render: (_, result) => <SelectButton targetAdvance={result.advance} />,
  },
  { title: "Time", dataIndex: "advance", render: approximateGen3FrameTime },
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => startCase(method),
  },
  ...ivColumns,
];

const Validator = z.object({
  delay: z.number().int().min(0),
  seed: HexSchema(0xffffffff),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  parent1_ivs: IvSchema,
  parent2_ivs: IvSchema,
  filter_min_ivs: IvSchema,
  filter_max_ivs: IvSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  delay: 3,
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
    label: "Delay",
    input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
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
      const parentIvs: [Ivs, Ivs] = [opts.parent1_ivs, opts.parent2_ivs];
      const methodResults = await pmap(
        ivMethods,
        async (method) => {
          const spreads = await rngTools.emerald_egg_pickup_states({
            ...opts,
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
