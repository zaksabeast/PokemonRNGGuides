import React from "react";
import { ResultColumn } from "~/components";
import {
  FieldRow,
  FormDateField,
  FormNumberField,
  FormSection,
  FormSwitchField,
  FormTimeField,
  IdFilterField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { rngTools, Gen6Id } from "~/rngTools";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  addRngTime,
  formatRngDateTime,
  rngDate,
  rngTime,
  RngDateSchema,
  RngTimeSchema,
} from "~/utils/time";
import { z } from "zod";
import { HexSchema } from "~/utils/number";
import { Translations } from "~/translations";

const getColumns = (t: Translations): ResultColumn<Gen6Id>[] => [
  {
    title: t["Seed"],
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: t["Advances"],
    dataIndex: "advances",
  },
  {
    title: t["TID"],
    dataIndex: "tid",
  },
  {
    title: t["SID"],
    dataIndex: "sid",
  },
  {
    title: t["TSV"],
    dataIndex: "tsv",
  },
  {
    title: t["Date/Time"],
    dataIndex: "datetime",
    render: (date) => formatRngDateTime(date, { seconds: true }),
  },
  {
    title: t["State"],
    dataIndex: "tinymt_state",
    monospace: true,
    render: (state: number[]) =>
      state
        .map((num) => num.toString(16).padStart(8, "0").toUpperCase())
        .reverse()
        .join(", "),
  },
];

const Validator = z.object({
  seed: HexSchema(0xffffffff),
  date: RngDateSchema,
  time: RngTimeSchema,
  only_current_seed: z.boolean(),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  filter: IdFilterSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  seed: 0,
  date: rngDate(),
  time: rngTime(),
  only_current_seed: false,
  initial_advances: 20,
  max_advances: 50,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormNumberField<FormState>
          name="seed"
          label={t["TinyMT u32 Seed"]}
          numType="hex"
        />
        <FieldRow>
          <FormDateField<FormState> name="date" label={t["Boot Date"]} />
          <FormTimeField<FormState>
            name="time"
            label={t["Boot Time"]}
            showSecond
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="initial_advances"
            label={t["Initial Advances"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advances"
            label={t["Max Advances"]}
            numType="decimal"
          />
        </FieldRow>
        <FormSwitchField<FormState>
          name="only_current_seed"
          label={t["Only Current Seed"]}
        />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <IdFilterField<FormState> name="filter" optional />
      </FormSection>
    </>
  );
};

export const OrasId = () => {
  const [results, setResults] = React.useState<Gen6Id[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const results = await rngTools.generate_oras_id({
      start_seed: opts.seed,
      only_start_seed: opts.only_current_seed,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      start_datetime: addRngTime(opts.date, opts.time),
      filter_id: denormalizeIdFilter(opts.filter),
    });

    setResults(results);
  };

  return (
    <ToolForm<FormState, Gen6Id>
      getColumns={getColumns}
      results={results}
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="generate_oras_id"
    >
      <Fields />
    </ToolForm>
  );
};
