import React from "react";
import { Skeleton } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Typography } from "./typography";
import { Timer } from "./timer";
import { RadioGroup } from "./radio";
import { Select } from "./select";
import { Field, FormFieldTable } from "./formFieldTable";
import { useAtom } from "~/state/localStorage";
import {
  multiTimerStateAtom,
  type MultiTimerState,
} from "~/state/multiTimerState";
import { hydrationLock, HydrationLock } from "~/utils/hydration";
import { useHydrate } from "~/hooks/useHydrate";
import * as tst from "ts-toolbelt";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import {
  calculateOffset,
  getMinutesBeforeTarget,
  useTimerSequence,
} from "~/hooks/useTimerSequence";

type InnerProps = {
  state: MultiTimerState;
  setState: (state: HydrationLock<MultiTimerState>) => void;
  minutesBeforeTarget: number;
  milliseconds: number[];
  labels?: React.ReactNode[];
  disableStart?: boolean;
  startButtonTrackerId: string;
  stopButtonTrackerId: string;
  slots?: {
    aboveStartButton?: React.ReactNode;
    belowStartButton?: React.ReactNode;
  };
};

const InnerMultiTimer = ({
  state,
  setState,
  minutesBeforeTarget,
  milliseconds,
  disableStart = false,
  startButtonTrackerId,
  stopButtonTrackerId,
  labels,
  slots,
}: InnerProps) => {
  const t = useActiveRouteTranslations();
  const {
    startTimeMs,
    currentTimerIndex,
    currentMs,
    nextMs,
    displayTimerMs,
    countdownMs,
    timerStartOffset,
    onExpire,
    toggle,
  } = useTimerSequence({
    milliseconds,
    maxBeepCount: state.maxBeepCount,
  });

  const timerSettingFields: Field[] = [
    {
      label: t["Display All Timers?"],
      input: (
        <Flex justify="flex-end">
          <RadioGroup
            name="timerDisplay"
            optionType="button"
            value={state.showAllTimers ? "showAllTimers" : "showCurrentTimer"}
            onChange={({ target }) => {
              setState(
                hydrationLock({
                  ...state,
                  showAllTimers: target.value === "showAllTimers",
                }),
              );
            }}
            options={[
              { label: t["Yes"], value: "showAllTimers" },
              { label: t["No"], value: "showCurrentTimer" },
            ]}
          />
        </Flex>
      ),
    },
    {
      label: t["Beeps"],
      input: (
        <Select<number>
          name="countdownBeeps"
          disabled={startTimeMs != null}
          value={state.maxBeepCount}
          onChange={(value) => {
            setState(
              hydrationLock({
                ...state,
                maxBeepCount: value,
              }),
            );
          }}
          options={new Array(11).fill(0).map((_, index) => ({
            label: (index + 1).toString(),
            value: index,
          }))}
        />
      ),
    },
  ];

  return (
    <Flex vertical gap={24}>
      {!state.showAllTimers && (
        <>
          <Flex vertical gap={16} justify="center" align="center">
            <Timer
              label={labels?.[currentTimerIndex]}
              expirationMs={currentMs}
              countdownMs={countdownMs}
              startTimeMs={startTimeMs}
              timerStartOffset={timerStartOffset}
              run={
                startTimeMs != null && currentTimerIndex < milliseconds.length
              }
              onExpire={onExpire}
            />
          </Flex>
          <Flex vertical gap={4}>
            <Typography.Text strong>
              {t["Next Phase"]}:{" "}
              {nextMs == null ? "None" : (nextMs / 1000).toFixed(3)}
            </Typography.Text>
            <Typography.Text strong>
              {t["Minutes Before Target"]}: {minutesBeforeTarget}
            </Typography.Text>
          </Flex>
        </>
      )}

      {state.showAllTimers && (
        <>
          <Flex wrap gap={16} justify="center" align="flex-start">
            {displayTimerMs.map((ms, index) => {
              const offsetForTimer = calculateOffset(displayTimerMs, index);
              return (
                <Timer
                  key={index}
                  label={labels?.[index]}
                  expirationMs={ms}
                  countdownMs={index === currentTimerIndex ? countdownMs : 0}
                  startTimeMs={startTimeMs}
                  timerStartOffset={offsetForTimer}
                  run={startTimeMs != null && index === currentTimerIndex}
                  onExpire={onExpire}
                />
              );
            })}
          </Flex>
          <Flex vertical gap={8}>
            <Typography.Text strong>
              {t["Minutes Before Target"]}: {minutesBeforeTarget}
            </Typography.Text>
          </Flex>
        </>
      )}

      <Flex gap={8} vertical>
        <FormFieldTable fields={timerSettingFields} />
        {slots?.aboveStartButton}

        <Button
          disabled={disableStart && startTimeMs == null}
          trackerId={
            startTimeMs != null ? startButtonTrackerId : stopButtonTrackerId
          }
          onClick={toggle}
        >
          {startTimeMs == null ? t["Start Timer"] : t["Stop Timer"]}
        </Button>

        {slots?.belowStartButton != null && (
          <Flex vertical gap={8} mt={16}>
            {slots?.belowStartButton}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export type MultiTimerProps = tst.O.Optional<
  tst.O.Omit<InnerProps, "state" | "setState">,
  "minutesBeforeTarget"
>;

export const MultiTimer = (props: MultiTimerProps) => {
  const [lockedState, setState] = useAtom(multiTimerStateAtom);
  const { hydrated, client: state } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerMultiTimer
      state={state}
      setState={setState}
      minutesBeforeTarget={
        props.minutesBeforeTarget ?? getMinutesBeforeTarget(props.milliseconds)
      }
      {...props}
    />
  );
};
