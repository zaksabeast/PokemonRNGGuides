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
  const targetDatetime = state.target?.dateTime.datetime;
  const datetime =
    targetDatetime == null ? dayjs() : fromRngDateTime(targetDatetime);

  const isHgss = state.game === "HeartGold" || state.game === "SoulSilver";
  const hgssOffset = isHgss ? 3 : 0;
  const adjustedDatetime = datetime.subtract(hgssOffset, "seconds");

  return {
    dateTime: adjustedDatetime,
    delay: state.target?.dateTime.delay ?? 0,
  };
};

export const Id4ConsoleSetDateString = () => {
  const [state] = useId4State();
  const { ms } = useGen4Timer(idTimerAtom);
  const { dateTime } = getGameDateTime(state);

  const targetMinutes = Math.floor(sum(ms) / 1000 / 60); // Convert milliseconds to minutes
  const consoleSetDate = dateTime.subtract(targetMinutes, "minutes");

  return <>{consoleSetDate.format(rngChronoFormat.dateHourMinutes)}</>;
};

export const Id4Timer = () => {
  const [state] = useId4State();
  const { dateTime, delay } = getGameDateTime(state);

  return (
    <Gen4Timer
      timer={idTimerAtom}
      targetDelay={delay}
      targetSecond={dateTime.second()}
      trackerId="id4_timer"
    />
  );
};
