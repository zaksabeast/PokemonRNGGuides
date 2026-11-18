import React from "react";
import { ResultColumn, Icon } from "~/components";
import {
  FormNumberField,
  FormSection,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { CalibrateTimerButton } from "../shared/calibrateTimerButton";
import { rngTools, Id4 } from "~/rngTools";
import { denormalizeIdFilterOrDefault } from "~/types/id";
import { z } from "zod";
import { useAtomValue } from "jotai";
import { gen4SetupAtom } from "../shared/state/setup";
import { gen4TargetAtom } from "../shared/state/target";
import { sortBy } from "lodash-es";
import { formatOffset } from "~/utils/offsetSymbol";
import { Translations } from "~/translations";
import { getSecondOffset } from "~/utils/time";

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
    disableVerticalPadding: true,
    render: (_, target) => (
      <CalibrateTimerButton
        trackerId="calibrate_gen4_id"
        hitDelay={target.seed_time.delay}
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
    title: t["SID"],
    dataIndex: "sid",
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

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
};

export const CalibrateId4 = () => {
  const t = useActiveRouteTranslations();
  const target = useAtomValue(gen4TargetAtom);
  const { game } = useAtomValue(gen4SetupAtom);
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    if (target == null) {
      return;
    }

    const { datetime: targetDateTime, delay: targetDelay } = target.seedTime;

    const minDelay = Math.max(targetDelay - 1000, 0);
    const maxDelay = targetDelay + 1000;
    const results = await rngTools.generate_gen4_ids({
      game_datetime: targetDateTime,
      game,
      min_delay: minDelay,
      max_delay: maxDelay,
      filter: denormalizeIdFilterOrDefault({
        type: "tid",
        value0: opts.tid,
        value1: null,
      }),
    });

    const formattedResults = results.map((result) => ({
      ...result,
      seed: result.seed_time.seed,
      flipDelay: targetDelay % 2 !== result.seed_time.delay % 2,
      delayOffset: result.seed_time.delay - targetDelay,
      delay: result.seed_time.delay,
      seconds: result.game_datetime.second,
      secondOffset: getSecondOffset(result.game_datetime, targetDateTime),
    }));

    setResults(
      sortBy(formattedResults, [
        (result) => Math.abs(result.delayOffset),
        (result) => Math.abs(result.secondOffset),
      ]),
    );
  };

  return (
    <ToolForm<FormState, Result>
      getColumns={getColumns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_dppt_id"
    >
      <FormSection>
        <FormNumberField<FormState>
          name="tid"
          label={t["Obtained TID"]}
          numType="decimal"
        />
      </FormSection>
    </ToolForm>
  );
};
