import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormikIdFilter,
  Button,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault, IdFilterSchema } from "~/types/id";
import { z } from "zod";
import { useId4State } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import { range } from "lodash-es";
import pMap from "p-map";
import { useFormikContext } from "formik";

type SelectButtonProps = {
  target: Id4;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const { values } = useFormikContext<FormState>();
  const [, setState] = useId4State();
  const [, setCurrentStep] = useCurrentStep();
  return (
    <Button
      trackerId="select_id4_target"
      onClick={async () => {
        const months = range(1, 12);
        const dates = (
          await pMap(
            months,
            async (month) => {
              return await rngTools.dppt_calculate_seedtime({
                seed: target.seed,
                forced_second: null,
                year: values.year,
                month,
              });
            },
            { concurrency: 12 },
          )
        ).flat();

        if (dates.length === 0) {
          // todo: show error
          return;
        }

        setState((state) => ({
          ...state,
          target: { id: target, dateTime: dates[0] },
        }));
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const columns: ResultColumn<Id4>[] = [
  {
    title: "Select",
    dataIndex: "seed",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "TID",
    dataIndex: "tid",
  },
  {
    title: "SID",
    dataIndex: "sid",
  },
  {
    title: "TSV",
    dataIndex: "tsv",
  },
  {
    title: "Delay",
    dataIndex: "delay",
  },
];

const Validator = z.object({
  year: z.number().int().min(2000).max(2100),
  min_delay: z.number().int().min(0),
  max_delay: z.number().int().min(0),
  filter: IdFilterSchema,
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  year: 2000,
  min_delay: 5000,
  max_delay: 5200,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const fields: Field[] = [
  {
    label: "Year",
    input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
  },
  {
    label: "Min Delay",
    input: <FormikNumberInput<FormState> name="min_delay" numType="decimal" />,
  },
  {
    label: "Max Delay",
    input: <FormikNumberInput<FormState> name="max_delay" numType="decimal" />,
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" />,
  },
];

export const Id4Searcher = () => {
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.search_dppt_ids({
      ...opts,
      filter: denormalizeIdFilterOrDefault(opts.filter),
    });

    setResults(results);
  }, []);

  return (
    <RngToolForm<FormState, Id4>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_dppt_id"
    />
  );
};
