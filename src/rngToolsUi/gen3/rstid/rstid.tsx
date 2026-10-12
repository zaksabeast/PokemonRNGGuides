import { Gen3TidSidResult, rngTools } from "~/rngTools";
import { ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  IdFilterField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import React from "react";
import { denormalizeIdFilter, IdFilterSchema } from "~/types/id";
import { z } from "zod";
import { useRsTidState } from "./rsTidState";
import { useCurrentStep } from "~/components/stepper/state";
import { GBA_FPS } from "~/utils/consts";

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
    disableVerticalPadding: true,
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

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <>
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
      </FormSection>

      <FormSection title={t["Filters"]}>
        <IdFilterField<FormState> name="filter" optional />
      </FormSection>
    </>
  );
};

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const RsTidSidGenerator = () => {
  const [results, setResults] = React.useState<RsTidTarget[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
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
      time: formatTime(res.advance / GBA_FPS),
      offset: 0,
    }));

    setResults(updatedResults);
  };

  return (
    <ToolForm<FormState, RsTidTarget>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_rs_tidsid"
    >
      <Fields />
    </ToolForm>
  );
};
