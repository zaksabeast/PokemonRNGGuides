import { Gen3TidSidResult, rngTools } from "~/rngTools";
import {
  Field,
  FormikIdFilter,
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Button,
} from "~/components";
import React from "react";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { z } from "zod";
import { useRsTidState } from "./rsTidState";
import { useCurrentStep } from "~/components/stepper/state";

type SelectButtonProps = {
  targetAdvance: number;
};

const SelectButton = ({ targetAdvance }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [state, setState] = useRsTidState();
  return (
    <Button
      trackerId="select_rs_tid_advance"
      onClick={() => {
        setState({ ...state, targetAdvance });
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

export type RsTidTarget = Gen3TidSidResult & { time: string; offset: number };

const columns: ResultColumn<RsTidTarget>[] = [
  {
    title: "Select",
    dataIndex: "advance",
    render: (advance) => <SelectButton targetAdvance={advance} />,
  },
  { title: "Est. Time", dataIndex: "time" },
  { title: "TID", dataIndex: "tid" },
  { title: "SID", dataIndex: "sid" },
  { title: "TSV", dataIndex: "tsv" },
];

const Validator = z.object({
  offset: z.number().int().min(0),
  initial_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  filter: IdFilterSchema,
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  initial_advances: 0,
  max_advances: 10000,
  offset: 0,
  filter: {
    type: "tid",
    value0: 0,
    value1: null,
  },
};

const fields: Field[] = [
  {
    label: "Initial Advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Max Advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Filter",
    input: <FormikIdFilter<FormState> name="filter" optional />,
  },
];

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const RsTidSidGenerator = () => {
  const [results, setResults] = React.useState<RsTidTarget[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const results = await rngTools.gen3_tidsid_states({
      offset: opts.offset,
      initial_advances: opts.initial_advances,
      max_advances: opts.max_advances,
      version_options: {
        Rs: "DeadBattery",
      },
      filter: denormalizeIdFilter(opts.filter),
    });

    const updatedResults = results.map((res) => ({
      ...res,
      time: formatTime(res.advance / 59.7275),
      offset: 0,
    }));

    setResults(updatedResults);
  }, []);

  return (
    <RngToolForm<FormState, RsTidTarget>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_rs_tidsid"
    />
  );
};
