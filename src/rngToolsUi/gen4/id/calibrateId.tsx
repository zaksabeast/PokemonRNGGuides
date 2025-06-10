import React from "react";
import {
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  CalibrateTimerButton,
  Icon,
} from "~/components";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault } from "~/types/id";
import { z } from "zod";
import { useId4State, idTimerAtom } from "./state";
import { useCurrentStep } from "~/components/stepper/state";
import { sortBy } from "lodash-es";
import { formatOffset } from "~/utils/offsetSymbol";

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

type Result = Id4 & {
  flipDelay: boolean;
  seed: number;
  delayOffset: number;
  delay: number;
  seconds: number;
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Calibrate",
    dataIndex: "seed",
    render: (_, target) => (
      <CalibrateButton hitDelay={target.seed_time.delay} />
    ),
  },
  {
    title: "Flip Delay",
    dataIndex: "flipDelay",
    render: (flipDelay) =>
      flipDelay ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: "Delay Offset",
    dataIndex: "delayOffset",
    render: formatOffset,
  },
  {
    title: "TID",
    dataIndex: "tid",
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

export const CalibrateId4 = () => {
  const [{ target }] = useId4State();
  const [results, setResults] = React.useState<Result[]>([]);

  const targetTid = target?.tid;

  const fields = React.useMemo(
    (): Field[] => [
      {
        label: `Target TID: ${targetTid ?? "None"}`,
        input: null,
      },
      {
        label: "Obtained TID",
        input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
      },
    ],
    [targetTid],
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      if (target == null) {
        return;
      }

      const { datetime: targetDateTime, delay: targetDelay } = target.seed_time;

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
        Math.abs(result.seed_time.delay - targetDelay),
      );

      const formattedResults = sortedResults.map((result) => ({
        ...result,
        seed: result.seed_time.seed,
        flipDelay: targetDelay % 2 !== result.seed_time.delay % 2,
        delayOffset: result.seed_time.delay - targetDelay,
        delay: result.seed_time.delay,
        seconds: result.seed_time.datetime.second,
      }));

      setResults(formattedResults);
    },
    [target],
  );

  return (
    <RngToolForm<FormState, Result>
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
