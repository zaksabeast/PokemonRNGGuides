import { Dayjs } from "dayjs";
import { rngChronoFormat, fromRngDateTime } from "~/utils/time";
import { match, P } from "ts-pattern";
import { sum } from "lodash-es";
import { gen4TargetAtom } from "./state/target";
import { gen4TimerAtom } from "./state/timer";
import { useAtomValue } from "jotai";

const adjustTargetForTimer = (timerMs: number[], targetDatetime: Dayjs) => {
  const targetMinutes = Math.floor(sum(timerMs) / 1000 / 60); // Convert milliseconds to minutes
  return targetDatetime.subtract(targetMinutes, "minutes");
};

export type ConsoleDateTimeFormat = "date" | "time";

type ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
  timerMs: number[];
  targetDatetime: Dayjs | null;
};

export const ConsoleSetDateString = ({
  format,
  timerMs,
  targetDatetime,
}: ConsoleSetDateStringProps) => {
  return match({ targetDatetime, format })
    .with({ targetDatetime: null, format: "date" }, () => <>Unknown date</>)
    .with({ targetDatetime: null, format: "time" }, () => <>Unknown time</>)
    .with({ targetDatetime: null, format: undefined }, () => (
      <>Unknown date/time</>
    ))
    .with({ targetDatetime: P.not(null), format: "date" }, (matched) => (
      <>
        {adjustTargetForTimer(timerMs, matched.targetDatetime).format(
          rngChronoFormat.date,
        )}
      </>
    ))
    .with({ targetDatetime: P.not(null), format: "time" }, (matched) => (
      <>
        {adjustTargetForTimer(timerMs, matched.targetDatetime).format(
          rngChronoFormat.hoursMinutes,
        )}
      </>
    ))
    .with({ targetDatetime: P.not(null), format: undefined }, (matched) => (
      <>
        {adjustTargetForTimer(timerMs, matched.targetDatetime).format(
          rngChronoFormat.dateHourMinutes,
        )}
      </>
    ))
    .exhaustive();
};

type Gen4ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
};

export const Gen4ConsoleSetDateString = ({
  format,
}: Gen4ConsoleSetDateStringProps) => {
  const target = useAtomValue(gen4TargetAtom);
  const timer = useAtomValue(gen4TimerAtom);
  const targetDateTime =
    target == null ? null : fromRngDateTime(target.seedTime.datetime);

  return (
    <ConsoleSetDateString
      format={format}
      targetDatetime={targetDateTime}
      timerMs={timer.ms}
    />
  );
};
