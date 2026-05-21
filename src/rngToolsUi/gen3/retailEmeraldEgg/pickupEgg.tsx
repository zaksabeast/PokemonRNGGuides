import React from "react";
import {
  ResultColumn,
  FormikNumberInput,
  IvInput,
  Field,
  RngToolForm,
  RngToolSubmit,
  Button,
  FormikSelect,
} from "~/components";
import { rngTools, Egg3PickupState, Gen3PickupMethod } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  getInheritedIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import {
  IvsSchema,
  NullableIvs,
  NullableIvsSchema,
} from "~/components/ivInput";
import {
  defaultHiddenPowerFilter,
  HiddenPowerSchema,
} from "~/components/hiddenPowerInput";
import {
  HiddenPowerInput,
  HiddenPowerSwitch,
} from "~/components/hiddenPowerInput.component";
import { HexSchema } from "~/utils/number";
import { usePickupEggState } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import pmap from "p-map";
import { sortBy } from "lodash-es";
import { approximateGen3FrameTime } from "~/utils/approximateGen3FrameTime";
import { getIvMethodOptions, ivMethodLabels, ivMethods } from "./constants";
import { Translations } from "~/translations";

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

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "advance",
    disableVerticalPadding: true,
    render: (_, result) => <SelectButton result={result} />,
  },
  { title: t["Time"], dataIndex: "advance", render: approximateGen3FrameTime },
  {
    title: t["Method"],
    dataIndex: "method",
    render: (method) => t[ivMethodLabels[method]],
  },
  ...getInheritedIvColumns(t),
  {
    title: t["Hidden power"],
    type: "group",
    columns: [
      {
        title: "Type",
        dataIndex: "hidden_power",
        render: (hidden_power) => hidden_power?.pokemon_type ?? "?",
      },
      {
        title: "Power",
        dataIndex: "hidden_power",
        render: (hidden_power) => hidden_power?.bp ?? "?",
      },
    ],
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
];

const hasCompleteParentIvs = (ivs: NullableIvs) =>
  Object.values(ivs).every((iv) => iv !== null);

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    initial_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    methods: z.enum(ivMethods).array().nonempty(),
    parent1_ivs: NullableIvsSchema,
    parent2_ivs: NullableIvsSchema,
    filter_min_ivs: IvsSchema,
    filter_max_ivs: IvsSchema,
    filter_hidden_power: HiddenPowerSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.filter_hidden_power.active) {
      return;
    }

    if (!hasCompleteParentIvs(data.parent1_ivs)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Hidden power filtering requires both parent IVs to be fully specified",
        path: ["parent1_ivs"],
      });
    }

    if (!hasCompleteParentIvs(data.parent2_ivs)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Hidden power filtering requires both parent IVs to be fully specified",
        path: ["parent2_ivs"],
      });
    }
  });

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  initial_advances: 1000,
  max_advances: 10000,
  methods: ivMethods,
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_hidden_power: defaultHiddenPowerFilter,
};

const getFields = (t: Translations): Field[] => [
  {
    label: t["Seed"],
    input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
  },
  {
    label: t["Initial advances"],
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: t["Max advances"],
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: t["Pickup method"],
    input: (
      <FormikSelect<FormState, "methods">
        name="methods"
        mode="multiple"
        options={getIvMethodOptions(t)}
      />
    ),
  },
  {
    label: t["Parent 1 IVs"],
    input: <IvInput<FormState, "nullable"> name="parent1_ivs" />,
  },
  {
    label: t["Parent 2 IVs"],
    input: <IvInput<FormState, "nullable"> name="parent2_ivs" />,
  },
  {
    label: t["Egg min IVs"],
    input: <IvInput<FormState> name="filter_min_ivs" />,
  },
  {
    label: t["Egg max IVs"],
    input: <IvInput<FormState> name="filter_max_ivs" />,
  },
  {
    label: t["Hidden power"],
    input: <HiddenPowerSwitch />,
  },
  {
    label: "",
    key: "retail_emerald_pickup_egg.hidden_power",
    direction: "column",
    showWhen: {
      fieldName: "filter_hidden_power.active",
      when: (active: unknown) => active === true,
    },
    input: <HiddenPowerInput<FormState> name="filter_hidden_power" />,
    indent: 1,
  },
];

export const RetailEmeraldPickupEgg = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [, setPickupEggState] = usePickupEggState();

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const parentIvs: [NullableIvs, NullableIvs] = [
      opts.parent1_ivs,
      opts.parent2_ivs,
    ];
    const methodResults = await pmap(
      opts.methods,
      async (method) => {
        const spreads = await rngTools.emerald_egg_pickup_states({
          ...opts,
          delay: 0,
          method,
          parent_ivs: parentIvs,
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
    const sortedResults = sortBy(flattenedResults, (result) => result.advance);

    setResults(sortedResults);
    setPickupEggState((prev) => ({ ...prev, seed: opts.seed, parentIvs }));
  };

  return (
    <RngToolForm<FormState, Result>
      getFields={getFields}
      getColumns={getColumns}
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
