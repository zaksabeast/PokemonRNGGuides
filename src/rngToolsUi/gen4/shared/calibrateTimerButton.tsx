import { message } from "antd";
import { useSetAtom } from "jotai";
import { calibrateGen4TimerAtom } from "./state/timer";
import { useCurrentStep } from "~/components/stepper/state";
import { Button } from "~/components";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

type CalibrateTimerButtonProps = {
  hitDelay: number;
  trackerId: string;
  lastStepOnClick?: number;
};

export const CalibrateTimerButton = ({
  hitDelay,
  trackerId,
  lastStepOnClick = 1,
}: CalibrateTimerButtonProps) => {
  const t = useActiveRouteTranslations();
  const calibrateTimer = useSetAtom(calibrateGen4TimerAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = async () => {
    calibrateTimer(hitDelay);
    setCurrentStep((step) => step - lastStepOnClick);
    messageApi.success("Calibrated timer");
  };

  return (
    <>
      {contextHolder}
      <Button trackerId={trackerId} onClick={onClick}>
        {t["Calibrate"]}
      </Button>
    </>
  );
};
