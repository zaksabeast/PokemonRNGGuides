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
import { sortBy } from "lodash-es";
import { formatOffset } from "~/utils/offsetSymbol";
import { Translations } from "~/translations";

type Result = Id4 & {
  flipDelay: boolean;
  seed: number;
  delayOffset: number;
  secondOffset: number;
  delay: number;
  seconds: number;
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Calibrate"],
    dataIndex: "seed",
    render: (_, target) => (
      <CalibrateTimerButton
        type="gen4"
        trackerId="calibrate_gen4_id"
        hitDelay={target.seed_time.delay}
        timer={idTimerAtom}
        previousStepOnClick
      />
    ),
  },
  {
    title: t["Flip Delay"],
    dataIndex: "flipDelay",
    render: (flipDelay) =>
      flipDelay ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: t["Delay Offset"],
    dataIndex: "delayOffset",
    render: formatOffset,
  },
  {
    title: t["Second Offset"],
    dataIndex: "secondOffset",
    render: formatOffset,
  },
  {
    title: t["TID"],
    dataIndex: "tid",
  },
  {
    title: t["Delay"],
    dataIndex: "delay",
  },
  {
    title: t["Seconds"],
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

  const getFields = React.useCallback(
    (t: Translations): Field[] => {
      const targetTidText = t["Target TID"];
      const noneText = t["None"];
      return [
        {
          label: `${targetTidText}: ${targetTid ?? noneText}`,
          input: null,
        },
        {
          label: t["Obtained TID"],
          input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
        },
      ];
    },
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

      const formattedResults = sortedResults.map((result) => {
        const secondOffset =
          result.seed_time.datetime.second - targetDateTime.second;
        return {
          ...result,
          seed: result.seed_time.seed,
          flipDelay:
            secondOffset % 2 === 0 &&
            targetDelay % 2 !== result.seed_time.delay % 2,
          delayOffset: result.seed_time.delay - targetDelay,
          delay: result.seed_time.delay,
          seconds: result.seed_time.datetime.second,
          secondOffset,
        };
      });

      setResults(formattedResults);
    },
    [target],
  );

  return (
    <RngToolForm<FormState, Result>
      getFields={getFields}
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_dppt_id"
    />
  );
};
