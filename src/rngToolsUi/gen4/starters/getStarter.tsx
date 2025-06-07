import { Gen4Timer } from "~/components/gen4Timer";
import { starterTimer, useStarterState } from "./state";
import { useGen4Timer } from "~/hooks/useGen4Timer";
import { fromRngDateTime, rngChronoFormat } from "~/utils/time";
import { sum } from "lodash-es";

export const Starter4ConsoleSetDateString = () => {
  const [state] = useStarterState();
  const { ms } = useGen4Timer(starterTimer);

  const targetMinutes = Math.floor(sum(ms) / 1000 / 60); // Convert milliseconds to minutes
  const targetDateTime = state.target?.seed_time.datetime;
  const consoleSetDate =
    targetDateTime == null
      ? null
      : fromRngDateTime(targetDateTime).subtract(targetMinutes, "minutes");

  return (
    <>
      {consoleSetDate?.format(rngChronoFormat.dateHourMinutes) ??
        "Unknown time"}
    </>
  );
};

export const GetStarter4 = () => {
  const [state] = useStarterState();
  const seedTime = state.target?.seed_time;
  return (
    <Gen4Timer
      is3ds={false}
      trackerId="get_gen4_starter_timer"
      targetDelay={seedTime?.delay ?? 0}
      targetSecond={seedTime?.datetime.second ?? 0}
      timer={starterTimer}
    />
  );
};
