import React from "react";
import { Skeleton } from "antd";
import { Button, Flex } from "~/components";
import { useHydrate } from "~/hooks/useHydrate";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { useAtom } from "~/state/localStorage";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { hydrationLock } from "~/utils/hydration";
import { PRIMARY_BUTTON_HEIGHT } from "./constants";
import { RunView } from "./runView";
import { BeepsRow } from "./setupParts";

type Mode = "setup" | "run";

type Props = {
  milliseconds: number[];
  labels?: string[];
  startTrackerId: string;
  stopTrackerId: string;
  disableStart?: boolean;
};

type InnerProps = Props & {
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerEmbeddedRunTimer = ({
  milliseconds,
  labels,
  startTrackerId,
  stopTrackerId,
  disableStart,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const [mode, setMode] = React.useState<Mode>("run");
  const sequence = useTimerSequence({ milliseconds, maxBeepCount });

  if (mode === "setup") {
    return (
      <Flex vertical gap={16}>
        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
        <Button
          trackerId="set_embedded_run_timer"
          type="primary"
          height={PRIMARY_BUTTON_HEIGHT}
          onClick={() => setMode("run")}
        >
          Set Timer
        </Button>
      </Flex>
    );
  }

  return (
    <RunView
      sequence={sequence}
      milliseconds={milliseconds}
      startTrackerId={startTrackerId}
      stopTrackerId={stopTrackerId}
      listTitle="Timers"
      rows={milliseconds.map((ms, index) => ({
        id: index,
        label: labels?.[index] ?? `Phase ${index + 1}`,
        ms,
      }))}
      onEdit={() => setMode("setup")}
      disableStart={disableStart}
    />
  );
};

export const EmbeddedRunTimer = (props: Props) => {
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client: multiTimerState } = useHydrate(
    lockedMultiTimerState,
  );

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerEmbeddedRunTimer
      {...props}
      maxBeepCount={multiTimerState.maxBeepCount}
      setMaxBeepCount={(maxBeepCount) =>
        setLockedMultiTimerState(
          hydrationLock({ ...multiTimerState, maxBeepCount }),
        )
      }
    />
  );
};
