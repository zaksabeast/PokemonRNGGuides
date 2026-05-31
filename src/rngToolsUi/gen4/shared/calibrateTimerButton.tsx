import { message } from "antd";
import { useAtom } from "jotai";
import { gen4StateAtom } from "./state";
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
  const [, updateState] = useAtom(gen4StateAtom);
  const [, setCurrentStep] = useCurrentStep();
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = async () => {
    updateState({ timer: { hitDelay } });
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
