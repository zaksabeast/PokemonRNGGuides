import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  FormikSelect,
  IvInput,
  Field,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { rngTools, Egg3PickupState } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  inheritedIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { IvsSchema } from "~/components/ivInput";
import { HexSchema } from "~/utils/number";
import { t } from "~/translations";
import { LanguageKey } from "~/guides";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";

type Result = FlattenIvs<Egg3PickupState>;

const getColumns = (language: LanguageKey): ResultColumn<Result>[] => {
  return [
    { title: t("Advance", language), dataIndex: "advance" },
    ...inheritedIvColumns,
  ];
};

const Validator = z.object({
  delay: z.number().int().min(0),
  seed: HexSchema(0xffffffff),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  method: z.enum(["EmeraldBred", "EmeraldBredSplit", "EmeraldBredAlternate"]),
  parent1_ivs: IvsSchema,
  parent2_ivs: IvsSchema,
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  delay: 3,
  seed: 0,
  initial_advances: 100,
  max_advances: 1000,
  method: "EmeraldBred",
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
};

const getFields = (language: LanguageKey): Field[] => {
  return [
    {
      label: t("Seed", language),
      input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
    },
    {
      label: t("Initial advances", language),
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: t("Max advances", language),
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: t("Delay", language),
      input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
    },
    {
      label: t("Parent 1 IVs", language),
      input: <IvInput<FormState> name="parent1_ivs" />,
    },
    {
      label: t("Parent 2 IVs", language),
      input: <IvInput<FormState> name="parent2_ivs" />,
    },
    {
      label: t("Method", language),
      input: (
        <FormikSelect<FormState, "method">
          name="method"
          options={[
            { label: t("Normal", language), value: "EmeraldBred" },
            { label: t("Split", language), value: "EmeraldBredSplit" },
            { label: t("Alternate", language), value: "EmeraldBredAlternate" },
          ]}
        />
      ),
    },
    {
      label: t("Egg min IVs", language),
      input: <IvInput<FormState> name="filter_min_ivs" />,
    },
    {
      label: t("Egg max IVs", language),
      input: <IvInput<FormState> name="filter_max_ivs" />,
    },
  ];
};

type Props = {
  lua?: boolean;
};

export const EmeraldPickupEgg = ({ lua = false }: Props) => {
  const language = useActiveRouteLanguage();
  const fields = React.useMemo(() => getFields(language), [language]);
  const columns = React.useMemo(() => getColumns(language), [language]);
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      const results = await rngTools.emerald_egg_pickup_states({
        ...opts,
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
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitButtonLabel={t("Generate", language)}
      formContainerId="emerald_pickup_egg_form"
      submitTrackerId="generate_emerald_pickup_egg"
    />
  );
};
