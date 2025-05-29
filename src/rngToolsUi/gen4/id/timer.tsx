import { Gen4Timer } from "~/components/gen4Timer";
import { idTimerAtom, useId4State } from "./state";

export const Id4Timer = () => {
  const [state] = useId4State();
  return (
    <Gen4Timer
      timer={idTimerAtom}
      targetDelay={state.target?.dateTime.delay ?? 0}
      targetSecond={state.target?.dateTime.datetime.second ?? 0}
      trackerId="id4_timer"
    />
  );
};
