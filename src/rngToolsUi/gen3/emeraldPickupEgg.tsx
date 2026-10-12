import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormRadioField,
  FormSection,
  IvFields,
  IvRangeFields,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { rngTools, Egg3PickupState } from "~/rngTools";
import { maxIvs, minIvs } from "~/types/ivs";
import {
  flattenIvs,
  FlattenIvs,
  inheritedIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { z } from "zod";
import { defaultHiddenPowerFilter } from "~/components/hiddenPowerInput";
import { IvsSchema } from "~/components/ivInput";
import { HexSchema } from "~/utils/number";
import { Translations } from "~/translations";

type Result = FlattenIvs<Egg3PickupState>;

const getColumns = (t: Translations): ResultColumn<Result>[] => {
  return [{ title: t["Advance"], dataIndex: "advance" }, ...inheritedIvColumns];
};

const Validator = z.object({
  delay: z.number().int(),
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
        <FormRadioField<FormState>
          name="method"
          label={t["Method"]}
          cellSize="word"
          options={[
            { label: t["Normal"], value: "EmeraldBred" },
            { label: t["Split"], value: "EmeraldBredSplit" },
            { label: t["Alternate"], value: "EmeraldBredAlternate" },
          ]}
        />
      </FormSection>

      <FormSection title={t["Parents"]}>
        <IvFields<FormState> name="parent1_ivs" title={t["Parent 1 IVs"]} />
        <IvFields<FormState> name="parent2_ivs" title={t["Parent 2 IVs"]} />
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
        <FormNumberField<FormState>
          name="delay"
          label={t["Delay"]}
          numType="decimal"
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <IvRangeFields<FormState>
          minName="filter_min_ivs"
          maxName="filter_max_ivs"
        />
      </FormSection>
    </>
  );
};

export const EmeraldPickupEgg = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.emerald_egg_pickup_states({
      ...opts,
      parent_ivs: [opts.parent1_ivs, opts.parent2_ivs],
      filter_hidden_power: defaultHiddenPowerFilter,
      methods: [opts.method],
    });

    setResults(results.map(flattenIvs));
  };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      formContainerId="emerald_pickup_egg_form"
      submitTrackerId="generate_emerald_pickup_egg"
    >
      <Fields />
    </ToolForm>
  );
};
