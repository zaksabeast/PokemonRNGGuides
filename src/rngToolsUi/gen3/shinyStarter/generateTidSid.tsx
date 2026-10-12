import React, { useState } from "react";
import { useAtom } from "jotai";
import { z } from "zod";
import { Flex } from "~/components";
import {
  FormCard,
  FormNumberField,
  FormSection,
  FormSummary,
  NumberField,
  SelectField,
  SwitchField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { EmbeddedRunTimer } from "~/rngToolsUi/timer/embeddedRunTimer";
import { rngTools, Gen3TidSidShinyResult } from "~/rngTools";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import { GBA_FPS } from "~/utils/consts";
import {
  ShinyStarterTidSidResult,
  shinyStarterConsoleAtom,
  shinyStarterTidSidResultsAtom,
  usingDeadBatteryAtom,
} from "./state";
import { Tooltip } from "antd";

const Validator = z.object({
  tid: z.number().int().min(0).max(65535),
});

// The component and rust code only support emerald. RS is not supported.

export type FormState = z.infer<typeof Validator>;

const OFFSET = 50;

const INITIAL_SEED = 0;

const initialValues: FormState = {
  tid: 0,
};

const QUALITATIVE_RATINGS = [
  "Perfect",
  "Very good",
  "Good",
  "Acceptable",
  "So-so",
  "Bad",
  "Very bad",
] as const;

const RECOMMEND_REDO_MSG = (chanceInPct: number) => (
  <Flex vertical>
    <div>Generate a new TID.</div>
    <div>
      ~{chanceInPct}% chance that the new TID will be significately faster to
      validate.
    </div>
  </Flex>
);

const RECOMMEND_KEEP_MSG = `Keep that TID and go to the next step.`;

const ADDITIONAL_DUR_IN_MINUTES = 30; // Duration not caused by in-game waiting (ex: filling form etc.)

export const GenerateTidSidRating = ({
  result,
}: {
  result: Gen3TidSidShinyResult;
}) => {
  const durInMinutes = Math.round(
    result.avg_adv_to_determine_sid / GBA_FPS / 60,
  );
  const pct = result.avg_adv_to_determine_sid_percentile;
  const qualitativeRating = (() => {
    if (pct <= 2) {
      return QUALITATIVE_RATINGS[0];
    }
    if (pct <= 5) {
      return QUALITATIVE_RATINGS[1];
    }
    if (pct <= 10) {
      return QUALITATIVE_RATINGS[2];
    }
    if (!result.should_improve_tid || pct <= 15) {
      return QUALITATIVE_RATINGS[3];
    }
    if (pct <= 25) {
      return QUALITATIVE_RATINGS[4];
    }
    if (pct <= 50) {
      return QUALITATIVE_RATINGS[5];
    }
    return QUALITATIVE_RATINGS[6];
  })();

  const estimatedTime = (
    <Tooltip title={`Percentile ${pct}`}>
      <span>{`~${durInMinutes + ADDITIONAL_DUR_IN_MINUTES} min (${qualitativeRating})`}</span>
    </Tooltip>
  );
  const recommendation = result.should_improve_tid
    ? RECOMMEND_REDO_MSG(pct)
    : RECOMMEND_KEEP_MSG;

  return (
    <FormCard>
      <FormSummary
        rows={[
          {
            label: `Estimated time to determine SID for TID ${result.tid}`,
            tooltip: {
              title: "Estimated time",
              description:
                "This estimation is based on how many advances in average you'll need to wait to get a shiny starter.",
            },
            value: estimatedTime,
          },
          {
            label: "Recommendation",
            value: recommendation,
          },
        ]}
      />
    </FormCard>
  );
};

type FieldsProps = {
  hasDeadBattery: boolean;
  setHasDeadBattery: (hasDeadBattery: boolean) => void;
  advFromOffset: number | null;
  setAdvFromOffset: React.Dispatch<React.SetStateAction<number | null>>;
};

const TimerFields = ({
  hasDeadBattery,
  setHasDeadBattery,
  advFromOffset,
  setAdvFromOffset,
}: FieldsProps) => {
  const [, setUsingDeadBattery] = useAtom(usingDeadBatteryAtom);
  const [consoleType, setConsoleType] = useAtom(shinyStarterConsoleAtom);
  const [idealAdvance, setIdealAdvance] = useState(0);

  React.useEffect(() => {
    setUsingDeadBattery(hasDeadBattery);
    rngTools
      .get_emerald_ideal_tidsid_advance_with_offset(hasDeadBattery)
      .then((adv) => {
        setIdealAdvance(adv);
      });
  }, [hasDeadBattery, setUsingDeadBattery]);

  const milliseconds = (() => {
    const advFromTimer = idealAdvance - (advFromOffset ?? 0) - OFFSET;
    let milliseconds = Math.round(
      (advFromTimer * 1000) / gen3ConsoleFpsMap[consoleType],
    );
    if (milliseconds < 0) {
      milliseconds = 0;
    }
    return [5000, milliseconds];
  })();

  return (
    <Flex vertical gap={10}>
      <FormCard>
        <FormSection>
          <SwitchField
            label="Using dead battery?"
            value={hasDeadBattery}
            onChange={setHasDeadBattery}
          />
          <SelectField<Gen3Console>
            name="console"
            label="Console"
            value={consoleType}
            options={gen3ConsoleOptions}
            onChange={setConsoleType}
          />
          <FormSummary
            rows={[
              {
                label: "Offset",
                tooltip: {
                  title: "Offset",
                  description:
                    "Number of advances between pressing the last input and the TID/SID generation.",
                },
                value: `${OFFSET}`,
              },
            ]}
          />
          <NumberField
            label="Human input delay (advance)"
            tooltip={{
              title: "Human input delay",
              description:
                "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
            }}
            numType="decimal"
            value={advFromOffset}
            onChange={(value) => {
              if (value == null || (value >= -999 && value <= 999)) {
                setAdvFromOffset(value);
              }
            }}
          />
        </FormSection>
      </FormCard>
      <EmbeddedRunTimer
        milliseconds={milliseconds}
        labels={["Confirm your name.", "Close Professor Birch's message."]}
        startTrackerId="start_gen3_shiny_starter_tidsid_timer"
        stopTrackerId="stop_gen3_shiny_starter_tidsid_timer"
      />
    </Flex>
  );
};

export const GenerateEmeraldTidSid = () => {
  const [result, setResult] = React.useState<Gen3TidSidShinyResult | null>(
    null,
  );
  const [, setTidSidResults] = useAtom(shinyStarterTidSidResultsAtom);
  const [hasDeadBattery, setHasDeadBattery] = useState(true);
  const [advFromOffset, setAdvFromOffset] = useState<number | null>(0);

  const updateDeadBattery = (value: boolean) => {
    setHasDeadBattery(value);
    setResult(null);
    setTidSidResults([]);
  };

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    const idealAdvance =
      await rngTools.get_emerald_ideal_tidsid_advance_with_offset(
        hasDeadBattery,
      );
    const rng_res = await rngTools.gen3_calculate_tidsid_shiny_for_tid(
      INITIAL_SEED,
      idealAdvance,
      opts.tid,
      hasDeadBattery,
    );

    setResult(rng_res);
    setTidSidResults(
      rng_res.nearby_sids.map((res) => ({
        ...res,
        tid: opts.tid,
        tid_gen_target_adv: idealAdvance,
        crossedOut: false,
      })),
    );
  };

  return (
    <Flex vertical gap={40}>
      <Flex vertical>
        <h2>Setup</h2>
        <TimerFields
          hasDeadBattery={hasDeadBattery}
          setHasDeadBattery={updateDeadBattery}
          advFromOffset={advFromOffset}
          setAdvFromOffset={setAdvFromOffset}
        />
      </Flex>
      <Flex vertical>
        <h2>Result</h2>
        <ToolForm<FormState, ShinyStarterTidSidResult>
          formContainerId="generate-tid-sid-for-shiny-starter"
          validationSchema={Validator}
          initialValues={initialValues}
          submitButtonLabel="Evaluate obtained TID"
          submitTrackerId="generate_tid_sid_for_shiny_starter"
          onSubmit={onSubmit}
        >
          <FormSection>
            <FormNumberField<FormState>
              name="tid"
              label="Obtained TID"
              numType="decimal"
            />
          </FormSection>
        </ToolForm>
      </Flex>
      {result != null && <GenerateTidSidRating result={result} />}
    </Flex>
  );
};
