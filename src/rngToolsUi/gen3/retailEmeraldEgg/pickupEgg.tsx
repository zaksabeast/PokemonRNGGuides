import React from "react";
import { uniqueId, sortBy } from "lodash-es";
import { ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormMultiSelectField,
  FormNumberField,
  FormSection,
  HiddenPowerField,
  IvRangeFields,
  NullableIvFields,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { rngTools, Egg3PickupState } from "~/rngTools";
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
import { HexSchema } from "~/utils/number";
import { usePickupEggState } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import { approximateGen3FrameTime } from "~/utils/approximateGen3FrameTime";
import { getIvMethodOptions, ivMethodLabels, ivMethods } from "./constants";
import { Translations } from "~/translations";

type Result = FlattenIvs<Egg3PickupState & { key: string }>;

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

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="seed"
          label={t["Seed"]}
          numType="hex"
        />
      </FormSection>

      <FormSection title={t["Parents"]}>
        <NullableIvFields<FormState>
          name="parent1_ivs"
          title={t["Parent 1 IVs"]}
        />
        <NullableIvFields<FormState>
          name="parent2_ivs"
          title={t["Parent 2 IVs"]}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max advances"]}
            numType="decimal"
          />
        </FieldRow>
        <FormMultiSelectField<FormState>
          name="methods"
          label={t["Pickup method"]}
          options={getIvMethodOptions(t)}
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <IvRangeFields<FormState>
          minName="filter_min_ivs"
          maxName="filter_max_ivs"
        />
        <HiddenPowerField<FormState> name="filter_hidden_power" />
      </FormSection>
    </>
  );
};

export const RetailEmeraldPickupEgg = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [, setPickupEggState] = usePickupEggState();

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const parentIvs: [NullableIvs, NullableIvs] = [
      opts.parent1_ivs,
      opts.parent2_ivs,
    ];
    const spreads = await rngTools.emerald_egg_pickup_states({
      ...opts,
      delay: 0,
      parent_ivs: parentIvs,
    });
    const res = spreads.map((spread) =>
      flattenIvs({
        ...spread,
        key: uniqueId(),
      }),
    );

    const sortedResults = sortBy(res, (result) => result.advance);

    setResults(sortedResults);
    setPickupEggState((prev) => ({ ...prev, seed: opts.seed, parentIvs }));
  };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="retail_emerald_pickup_egg_form"
      submitTrackerId="generate_retail_emerald_pickup_egg"
      rowKey="key"
    >
      <Fields />
    </ToolForm>
  );
};
