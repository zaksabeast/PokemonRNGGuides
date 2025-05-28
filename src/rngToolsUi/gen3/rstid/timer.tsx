import { useRsTidState } from "./rsTidState";
import { createGen3TimerAtom } from "~/hooks/useGen3Timer";
import { Gen3Timer } from "~/components/gen3Timer";

const timerAtom = createGen3TimerAtom();

export const RsTidTimer = () => {
  const [state] = useRsTidState();
  return (
    <Gen3Timer
      trackerId="retail_emerald_pickup_egg"
      targetAdvance={state.targetAdvance}
      timer={timerAtom}
    />
  );
};
