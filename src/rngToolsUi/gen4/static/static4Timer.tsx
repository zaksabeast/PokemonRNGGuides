import { Gen4Timer } from "~/components/gen4Timer";
import { static4TimerAtom, useStatic4State } from "./state";
import { useAtom } from "jotai";
import { fromRngDateTime } from "~/utils/time";
import {
  ConsoleDateTimeFormat,
  ConsoleSetDateString,
} from "../shared/consoleDateStrings";

type Static4ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
};

export const Static4ConsoleSetDateString = ({
  format,
}: Static4ConsoleSetDateStringProps) => {
  const [state] = useStatic4State();
  const [timer] = useAtom(static4TimerAtom);
  const datetime = state.target?.seed_time.datetime;
  const targetDateTime = datetime == null ? null : fromRngDateTime(datetime);

  return (
    <ConsoleSetDateString
      format={format}
      targetDatetime={targetDateTime}
      timerMs={timer.ms}
    />
  );
};

export const Static4Timer = () => {
  const [state] = useStatic4State();

  return (
    <Gen4Timer
      is3ds={state.console === "3dsNormalSettings"}
      trackerId="get_gen4_static_timer"
      timer={static4TimerAtom}
    />
  );
};
