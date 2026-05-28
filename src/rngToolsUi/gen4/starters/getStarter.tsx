import { Gen4Timer } from "~/components/gen4Timer";
import { starterTimer, useStarterState } from "./state";
import { useAtom } from "jotai";
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
  const [timer] = useAtom(starterTimer);
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

export const GetStarter4 = () => {
  const [state] = useStarterState();

  return (
    <Gen4Timer
      is3ds={state.console === "3dsNormalSettings"}
      trackerId="get_gen4_starter_timer"
      timer={starterTimer}
    />
  );
};
