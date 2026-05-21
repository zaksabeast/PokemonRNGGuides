import { Gen4Timer } from "~/components/gen4Timer";
import { static4TimerAtom, useStatic4State } from "./state";
import { useGen4Timer } from "~/hooks/useGen4Timer";
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
  const { ms } = useGen4Timer(static4TimerAtom);
  const datetime = state.target?.seed_time.datetime;
  const targetDateTime = datetime == null ? null : fromRngDateTime(datetime);

  return (
    <ConsoleSetDateString
      format={format}
      targetDatetime={targetDateTime}
      timerMs={ms}
    />
  );
};

export const Static4Timer = () => {
  const [state] = useStatic4State();
  const seedTime = state.target?.seed_time;

  return (
    <Gen4Timer
      selfInit
      is3ds={state.console === "3dsNormalSettings"}
      trackerId="get_gen4_static_timer"
      targetDelay={seedTime?.delay ?? 0}
      targetSecond={seedTime?.datetime.second ?? 0}
      timer={static4TimerAtom}
    />
  );
};
