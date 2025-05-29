import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  CalibrateTimerButton,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault } from "~/types/id";
import { z } from "zod";
import { useId4State, idTimerAtom } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import { sortBy } from "lodash-es";

type CalibrateButtonProps = {
  hitDelay: number;
};

const CalibrateButton = ({ hitDelay }: CalibrateButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  return (
    <CalibrateTimerButton
      type="gen4"
      trackerId="calibrate_gen4_id"
      hitDelay={hitDelay}
      timer={idTimerAtom}
      onClick={() => setCurrentStep((step) => step - 1)}
    />
  );
};

const columns: ResultColumn<Id4>[] = [
  {
    title: "Calibrate",
    dataIndex: "seed",
    render: (_, target) => <CalibrateButton hitDelay={target.delay} />,
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
  {
    title: "Seconds",
    dataIndex: "seconds",
  },
];

const Validator = z.object({
  tid: z.number().int().min(0).max(65535),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
};

const fields: Field[] = [
  {
    label: "Obtained TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
];

export const CalibrateId4 = () => {
  const [{ target }] = useId4State();
  const [results, setResults] = React.useState<Id4[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      if (target == null) {
        return;
      }

      const { datetime: targetDateTime, delay: targetDelay } = target.dateTime;

      const minDelay = targetDelay - 1000;
      const maxDelay = targetDelay + 1000;

      const results = await rngTools.generate_dppt_ids({
        datetime: targetDateTime,
        min_delay: minDelay,
        max_delay: maxDelay,
        filter: denormalizeIdFilterOrDefault({
          type: "tid",
          value0: opts.tid,
          value1: null,
        }),
      });

      const sortedResults = sortBy(results, (result) =>
        Math.abs(result.delay - targetDelay),
      );

      setResults(sortedResults);
    },
    [target],
  );

  return (
    <RngToolForm<FormState, Id4>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_dppt_id"
    />
  );
};
