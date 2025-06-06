import { Gen4Timer } from "~/components/gen4Timer";
import { starterTimer, useStarterState } from "./state";

export const GetStarter4 = () => {
  const [state] = useStarterState();
  const seedTime = state.target?.seed_time;
  return (
    <Gen4Timer
      trackerId="get_gen4_starter_timer"
      targetDelay={seedTime?.delay ?? 0}
      targetSecond={seedTime?.datetime.second ?? 0}
      timer={starterTimer}
    />
  );
};
