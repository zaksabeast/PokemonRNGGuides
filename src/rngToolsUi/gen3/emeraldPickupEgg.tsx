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
import { useTranslator, Translations, Translator } from "~/utils/siteLanguage";

const englishTranslations = {
  Advance: "Advance",
  Seed: "Seed",
  "Initial advances": "Initial advances",
  "Max advances": "Max advances",
  Delay: "Delay",
  "Parent 1 IVs": "Parent 1 IVs",
  "Parent 2 IVs": "Parent 2 IVs",
  Method: "Method",
  Normal: "Normal",
  Split: "Split",
  Alternate: "Alternate",
  "Egg min IVs": "Egg min IVs",
  "Egg max IVs": "Egg max IVs",
  Generate: "Generate",
} as const;

const translations = {
  en: englishTranslations,
  it: {
    Advance: "Advance",
    Seed: "Seed",
    "Initial advances": "Advance Iniziali",
    "Max advances": "Advance Massimi",
    Delay: "Ritardo",
    "Parent 1 IVs": "IV del Parente 1",
    "Parent 2 IVs": "IV del Parente 2",
    Method: "Metodo",
    Normal: "Normale",
    Split: "Split",
    Alternate: "Alternato",
    "Egg min IVs": "IV minime dell'uovo",
    "Egg max IVs": "IV massime dell'uovo",
    Generate: "Genera",
  },
} as const satisfies Translations<typeof englishTranslations>;

type Result = FlattenIvs<Egg3PickupState>;

const getColumns = (
  t: Translator<typeof translations>,
): ResultColumn<Result>[] => {
  return [{ title: t("Advance"), dataIndex: "advance" }, ...inheritedIvColumns];
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

const getFields = (t: Translator<typeof translations>): Field[] => {
  return [
    {
      label: t("Seed"),
      input: <FormikNumberInput<FormState> name="seed" numType="hex" />,
    },
    {
      label: t("Initial advances"),
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: t("Max advances"),
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
    },
    {
      label: t("Delay"),
      input: <FormikNumberInput<FormState> name="delay" numType="decimal" />,
    },
    {
      label: t("Parent 1 IVs"),
      input: <IvInput<FormState> name="parent1_ivs" />,
    },
    {
      label: t("Parent 2 IVs"),
      input: <IvInput<FormState> name="parent2_ivs" />,
    },
    {
      label: t("Method"),
      input: (
        <FormikSelect<FormState, "method">
          name="method"
          options={[
            { label: t("Normal"), value: "EmeraldBred" },
            { label: t("Split"), value: "EmeraldBredSplit" },
            { label: t("Alternate"), value: "EmeraldBredAlternate" },
          ]}
        />
      ),
    },
    {
      label: t("Egg min IVs"),
      input: <IvInput<FormState> name="filter_min_ivs" />,
    },
    {
      label: t("Egg max IVs"),
      input: <IvInput<FormState> name="filter_max_ivs" />,
    },
  ];
};

type Props = {
  lua?: boolean;
  language?: keyof typeof translations;
};

export const EmeraldPickupEgg = ({ lua = false, language }: Props) => {
  const t = useTranslator(translations, language ?? "en");
  const fields = React.useMemo(() => getFields(t), [t]);
  const columns = React.useMemo(() => getColumns(t), [t]);
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
      submitButtonLabel={t("Generate")}
      formContainerId="emerald_pickup_egg_form"
      submitTrackerId="generate_emerald_pickup_egg"
    />
  );
};
