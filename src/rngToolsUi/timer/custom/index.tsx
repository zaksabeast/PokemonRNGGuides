import { Skeleton } from "antd";
import styled from "@emotion/styled";
import React from "react";
import { Flex } from "~/components";
import { FormCard, PrimaryButton } from "~/components/form";
import { multiTimerStateAtom } from "~/state/multiTimerState";
import { useHydrate } from "~/hooks/useHydrate";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { useAtom } from "~/state/localStorage";
import { hydrationLock } from "~/utils/hydration";
import { formatDuration } from "../format";
import { TimerModeField, type TimerMode } from "../setupParts";
import { RunDisplay } from "./runDisplay";
import { SetupMode } from "./setupMode";
import {
  calibrate,
  customTimerSettingsAtom,
  getMilliseconds,
  type AllTimerSettings,
} from "./state";

const Screen = styled(Flex)({
  width: "100%",
});

const SummaryRow = styled(Flex)(({ theme }) => ({
  fontFamily: "monospace",
  fontSize: 11,
  lineHeight: 1,
  color: theme.token.colorTextTertiary,
}));

type InnerProps = {
  saved: AllTimerSettings;
  setSaved: (settings: AllTimerSettings) => void;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
};

const InnerCustomTimer = ({
  saved,
  setSaved,
  maxBeepCount,
  setMaxBeepCount,
}: InnerProps) => {
  const [mode, setMode] = React.useState<TimerMode>(
    saved.timers.length === 0 ? "setup" : "run",
  );
  const [draft, setDraft] = React.useState(saved);

  const savedMilliseconds = getMilliseconds(saved);
  const draftMilliseconds = getMilliseconds(draft);
  const sequence = useTimerSequence({
    milliseconds: savedMilliseconds,
    maxBeepCount,
  });

  const totalMs = draftMilliseconds.reduce((sum, ms) => sum + ms, 0);

  const onCalibrate = (index: number, hit: number) => {
    const timer = saved.timers[index];
    if (timer == null) {
      return;
    }

    const calibration = calibrate(saved.console, timer, hit);
    const timers = saved.timers.map((existing, existingIndex) =>
      existingIndex === index ? { ...existing, calibration } : existing,
    );

    const updated = { ...saved, timers };
    setSaved(updated);
    setDraft(updated);
  };

  return (
    <Screen vertical gap={16}>
      <TimerModeField
        value={mode}
        onChange={setMode}
        isRunning={sequence.isRunning}
      />

      {mode === "run" && (
        <RunDisplay
          settings={saved}
          milliseconds={savedMilliseconds}
          sequence={sequence}
          onEditInSetup={() => setMode("setup")}
          onCalibrate={onCalibrate}
        />
      )}

      {mode === "setup" && (
        <>
          <SummaryRow justify="space-between">
            <span>{`${draft.timers.length} timers`}</span>
            <span>{`${formatDuration(totalMs)} total`}</span>
          </SummaryRow>

          <FormCard>
            <SetupMode
              draft={draft}
              setDraft={setDraft}
              milliseconds={draftMilliseconds}
              maxBeepCount={maxBeepCount}
              setMaxBeepCount={setMaxBeepCount}
            />

            <PrimaryButton
              trackerId="set_custom_timer"
              onClick={() => {
                setSaved(draft);
                setMode("run");
              }}
            >
              Set Timer
            </PrimaryButton>
          </FormCard>
        </>
      )}
    </Screen>
  );
};

export const CustomTimer = () => {
  const [lockedSettings, setLockedSettings] = useAtom(customTimerSettingsAtom);
  const [lockedMultiTimerState, setLockedMultiTimerState] =
    useAtom(multiTimerStateAtom);
  const { hydrated, client } = useHydrate({
    saved: lockedSettings,
    multiTimerState: lockedMultiTimerState,
  });

  if (!hydrated) {
    return <Skeleton />;
  }

  return (
    <InnerCustomTimer
      saved={client.saved}
      setSaved={(settings) => setLockedSettings(hydrationLock(settings))}
      maxBeepCount={client.multiTimerState.maxBeepCount}
      setMaxBeepCount={(maxBeepCount) =>
        setLockedMultiTimerState(
          hydrationLock({ ...client.multiTimerState, maxBeepCount }),
        )
      }
    />
  );
};
