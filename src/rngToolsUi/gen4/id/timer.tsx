import { Gen4Timer } from "~/components/gen4Timer";
import { idTimerAtom, useId4State, Id4State } from "./state";
import { fromRngDateTime } from "~/utils/time";
import { useGen4Timer } from "~/hooks/useGen4Timer";
import {
  ConsoleDateTimeFormat,
  ConsoleSetDateString,
} from "../shared/consoleDateStrings";

/**
 * Returns the game date and time adjusted for HGSS if applicable.
 */
const getGameDateTime = (state: Id4State) => {
  const seedTime = state.target?.seed_time;
  const targetDatetime = seedTime?.datetime;
  const datetime =
    targetDatetime == null ? null : fromRngDateTime(targetDatetime);

  if (datetime == null) {
    return null;
  }

  const isHgss = state.game === "HeartGold" || state.game === "SoulSilver";
  const hgssOffset = isHgss ? 3 : 0;
  return datetime.subtract(hgssOffset, "seconds");
};

type Id4ConsoleSetDateStringProps = {
  format?: ConsoleDateTimeFormat;
};

export const Id4ConsoleSetDateString = ({
  format,
}: Id4ConsoleSetDateStringProps) => {
  const [state] = useId4State();
  const { ms } = useGen4Timer(idTimerAtom);
  const datetime = getGameDateTime(state);

  return (
    <ConsoleSetDateString
      format={format}
      targetDatetime={datetime}
      timerMs={ms}
    />
  );
};

export const Id4Timer = () => {
  const [state] = useId4State();
  const dateTime = getGameDateTime(state);

  return (
    <Gen4Timer
      selfInit
      is3ds={state.is3ds}
      timer={idTimerAtom}
      targetDelay={state.target?.seed_time?.delay ?? 0}
      targetSecond={dateTime?.second() ?? 0}
      trackerId="id4_timer"
    />
  );
};
