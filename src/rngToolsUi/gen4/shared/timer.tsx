import React from "react";
import { Skeleton } from "antd";
import { Card, Flex, RadioGroup } from "~/components";
import { MetronomeButton } from "~/components/metronome";
import { useHydrate } from "~/hooks/useHydrate";
import { useMetronome } from "~/hooks/useMetronome";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { GEN4_PHASE_LABELS } from "~/rngToolsUi/timer/atoms";
import { RunView } from "~/rngToolsUi/timer/runView";
import { useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { hydrationLock } from "~/utils/hydration";
import { Gen4EmbeddedSetup } from "./embeddedSetup";
import { gen4StateAtom, gen4TimerAtom } from "./state";

type Mode = "setup" | "run";

type InnerProps = {
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerGen4EmbeddedTimer = ({
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const [{ config, timer }] = useAtom(gen4StateAtom);
  const [, updateTimer] = useAtom(gen4TimerAtom);
  const [mode, setMode] = React.useState<Mode>("run");
  const metronome = useMetronome({ enableAudio: true });
  const sequence = useTimerSequence({ milliseconds: timer.ms, maxBeepCount });

  const is3ds = config.console === "3dsNormalSettings";

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
          startTrackerId="gen4_timer_start"
          stopTrackerId="gen4_timer_stop"
          listTitle="Timers"
          rows={timer.ms.map((ms, index) => ({
            id: index,
            label: GEN4_PHASE_LABELS[index] ?? `Phase ${index + 1}`,
            ms,
          }))}
          onEdit={() => setMode("setup")}
          disableStart={
            (is3ds && !metronome.isRunning) ||
            (metronome.isRunning && !metronome.justTicked)
          }
          belowStartButton={is3ds && <MetronomeButton {...metronome} />}
        />
      )}

      {mode === "setup" && (
        <Gen4EmbeddedSetup
          settings={timer.settings}
          maxBeepCount={maxBeepCount}
          setMaxBeepCount={setMaxBeepCount}
          onSet={(settings) => {
            // Updating through gen4StateAtom would reset the target second to the seed's
            updateTimer(settings);
            setMode("run");
          }}
        />
      )}
    </Flex>
  );
};

export const Gen4EmbeddedTimer = () => {
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client: multiTimerState } = useHydrate(
    lockedMultiTimerState,
  );

  return (
    <Card>
      {hydrated ? (
        <InnerGen4EmbeddedTimer
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
