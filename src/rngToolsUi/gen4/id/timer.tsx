import { Gen4Timer } from "~/components/gen4Timer";
import { idTimerAtom, useId4State, Id4State } from "./state";
import dayjs from "dayjs";
import { fromRngDateTime, rngChronoFormat } from "~/utils/time";
import { useGen4Timer } from "~/hooks/useGen4Timer";
import { sum } from "lodash-es";

/**
 * Returns the game date and time adjusted for HGSS if applicable.
 */
const getGameDateTime = (state: Id4State) => {
  const seedTime = state.target?.seed_time;
  const targetDatetime = seedTime?.datetime;
  const datetime =
    targetDatetime == null ? dayjs() : fromRngDateTime(targetDatetime);

  const isHgss = state.game === "HeartGold" || state.game === "SoulSilver";
  const hgssOffset = isHgss ? 3 : 0;
  const adjustedDatetime = datetime.subtract(hgssOffset, "seconds");

  return {
    dateTime: adjustedDatetime,
    delay: seedTime?.delay ?? 0,
  };
};

type Id4ConsoleSetDateStringProps = {
  format?: "date" | "time";
};

export const Id4ConsoleSetDateString = ({
  format,
}: Id4ConsoleSetDateStringProps) => {
  const [state] = useId4State();
  const { ms } = useGen4Timer(idTimerAtom);
  const { dateTime } = getGameDateTime(state);

  const targetMinutes = Math.floor(sum(ms) / 1000 / 60); // Convert milliseconds to minutes
  const consoleSetDate = dateTime.subtract(targetMinutes, "minutes");

  const formatTemplate =
    format === "date" ? rngChronoFormat.date : rngChronoFormat.hoursMinutes;

  return <>{consoleSetDate.format(formatTemplate)}</>;
};

export const Id4Timer = () => {
  const [state] = useId4State();
  const { dateTime, delay } = getGameDateTime(state);

  return (
    <Gen4Timer
      is3ds={state.is3ds}
      timer={idTimerAtom}
      targetDelay={delay}
      targetSecond={dateTime.second()}
      trackerId="id4_timer"
    />
  );
};
