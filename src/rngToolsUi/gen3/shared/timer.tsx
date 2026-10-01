import React from "react";
import { Skeleton } from "antd";
import { useAtom as useJotaiAtom } from "jotai";
import { Card, Flex, RadioGroup } from "~/components";
import { useHydrate } from "~/hooks/useHydrate";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import {
  getGen3PhaseLabels,
  type Gen3TimerAtom,
} from "~/rngToolsUi/timer/atoms";
import { RunView } from "~/rngToolsUi/timer/runView";
import { useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { hydrationLock } from "~/utils/hydration";
import { Gen3EmbeddedSetup } from "./embeddedSetup";

type Mode = "setup" | "run";

type TimerProps = {
  trackerId: string;
  targetAdvance: number;
  timer: Gen3TimerAtom;
};

type InnerProps = TimerProps & {
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerGen3EmbeddedTimer = ({
  trackerId,
  targetAdvance,
  timer: timerAtom,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const [timer, updateTimer] = useJotaiAtom(timerAtom);
  const [mode, setMode] = React.useState<Mode>("run");
  const sequence = useTimerSequence({ milliseconds: timer.ms, maxBeepCount });

  // The target comes from the guide's state, which lives outside the timer atom
  React.useEffect(() => {
    updateTimer({ targetFrame: targetAdvance });
  }, [updateTimer, targetAdvance]);

  const labels = getGen3PhaseLabels(timer.settings);

  return (
    <Flex vertical gap={16}>
      <RadioGroup<Mode>
        name="timerMode"
        optionType="button"
        value={mode}
        onChange={({ target }) => setMode(target.value)}
        options={[
          { label: "Setup", value: "setup", disabled: sequence.isRunning },
          { label: "Run", value: "run" },
        ]}
      />

      {mode === "run" && (
        <RunView
          sequence={sequence}
          milliseconds={timer.ms}
          startTrackerId={`${trackerId}_start`}
          stopTrackerId={`${trackerId}_stop`}
          listTitle="Timers"
          rows={timer.ms.map((ms, index) => ({
            id: index,
            label: labels[index] ?? `Phase ${index + 1}`,
            ms,
          }))}
          onEdit={() => setMode("setup")}
        />
      )}

      {mode === "setup" && (
        <Gen3EmbeddedSetup
          settings={timer.settings}
          maxBeepCount={maxBeepCount}
          setMaxBeepCount={setMaxBeepCount}
          onSet={(settings) => {
            updateTimer(settings);
            setMode("run");
          }}
        />
      )}
    </Flex>
  );
};

export const Gen3EmbeddedTimer = (props: TimerProps) => {
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client: multiTimerState } = useHydrate(
    lockedMultiTimerState,
  );

  return (
    <Card>
      {hydrated ? (
        <InnerGen3EmbeddedTimer
          {...props}
          maxBeepCount={multiTimerState.maxBeepCount}
          setMaxBeepCount={(maxBeepCount) =>
            setLockedMultiTimerState(
              hydrationLock({ ...multiTimerState, maxBeepCount }),
            )
          }
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};
