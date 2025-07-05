import { Gen4Timer } from "~/components/gen4Timer";
import { starterTimer, useStarterState } from "./state";
import { useGen4Timer } from "~/hooks/useGen4Timer";
import { fromRngDateTime } from "~/utils/time";
import {
  ConsoleDateTimeFormat,
  ConsoleSetDateString,
} from "../shared/consoleDateStrings";

type Starter4ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
};

export const Starter4ConsoleSetDateString = ({
  format,
}: Starter4ConsoleSetDateStringProps) => {
  const [state] = useStarterState();
  const { ms } = useGen4Timer(starterTimer);
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

export const GetStarter4 = () => {
  const [state] = useStarterState();
  const seedTime = state.target?.seed_time;

  return (
    <Gen4Timer
      selfInit
      is3ds={state.console === "3dsNormalSettings"}
      trackerId="get_gen4_starter_timer"
      targetDelay={seedTime?.delay ?? 0}
      targetSecond={seedTime?.datetime.second ?? 0}
      timer={starterTimer}
    />
  );
};
