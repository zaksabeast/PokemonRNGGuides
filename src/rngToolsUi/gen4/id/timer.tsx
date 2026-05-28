import { Gen4Timer } from "~/components/gen4Timer";
import { idTimerAtom, useId4State } from "./state";
import { useAtom } from "jotai";
import {
  ConsoleDateTimeFormat,
  ConsoleSetDateString,
} from "../shared/consoleDateStrings";
import { getGameDateTime } from "./utils";

type Id4ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
};

export const Id4ConsoleSetDateString = ({
  format,
}: Id4ConsoleSetDateStringProps) => {
  const [state] = useId4State();
  const [timer] = useAtom(idTimerAtom);
  const datetime = getGameDateTime({
    game: state.game,
    seedTime: state.target?.seed_time ?? null,
  });

  return (
    <ConsoleSetDateString
      format={format}
      targetDatetime={datetime}
      timerMs={timer.ms}
    />
  );
};

export const Id4Timer = () => {
  const [state] = useId4State();

  return (
    <Gen4Timer
      is3ds={state.console === "3dsNormalSettings"}
      timer={idTimerAtom}
      trackerId="id4_timer"
    />
  );
};
