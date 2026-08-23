import { Gen4Timer as BaseGen4Timer } from "~/components/gen4Timer";
import { gen4TimerAtom, gen4StateAtom } from "./state";
import { useAtom } from "jotai";

export const Gen4EmbeddedTimer = () => {
  const [{ config }] = useAtom(gen4StateAtom);

  return (
    <BaseGen4Timer
      is3ds={config.console === "3dsNormalSettings"}
      timer={gen4TimerAtom}
      trackerId="gen4_timer"
    />
  );
};
