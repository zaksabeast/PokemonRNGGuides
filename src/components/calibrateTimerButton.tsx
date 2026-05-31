import { Button } from "./button";
import { message } from "antd";
import { Gen3TimerAtom, Gen4TimerAtom } from "~/rngToolsUi/timer/atoms";
import { useAtom } from "jotai";
import { match } from "ts-pattern";
import { useCurrentStep } from "./stepper/state";

type InnerCalibrateButtonProps = {
  trackerId: string;
  lastStepOnClick?: number;
  label?: string;
  calibrate: () => Promise<unknown>;
  onClick?: () => void;
};

const InnerCalibrateButton = ({
  trackerId,
  lastStepOnClick: previousStepOnClick,
  label = "Calibrate",
  calibrate,
  onClick: _onClick,
}: InnerCalibrateButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = async () => {
    await calibrate();
    if (previousStepOnClick != null) {
      setCurrentStep((step) => step - previousStepOnClick);
    }
    messageApi.success("Calibrated timer");
    _onClick?.();
  };

  return (
    <>
      {contextHolder}
      <Button trackerId={trackerId} onClick={onClick}>
        {label}
      </Button>
    </>
  );
};

type CalibrateGen3ButtonProps = {
  type: "gen3";
  hitAdvance: number;
  timer: Gen3TimerAtom;
  trackerId: string;
  lastStepOnClick?: number;
  label?: string;
  onClick?: () => void;
};

const CalibrateGen3Button = ({
  hitAdvance,
  timer,
  trackerId,
  lastStepOnClick,
  label,
  onClick,
}: CalibrateGen3ButtonProps) => {
  const [, updateTimer] = useAtom(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      calibrate={async () => updateTimer({ hit_advance: hitAdvance })}
      lastStepOnClick={lastStepOnClick}
      onClick={onClick}
      label={label}
    />
  );
};

type CalibrateGen4ButtonProps = {
  type: "gen4";
  hitDelay: number;
  timer: Gen4TimerAtom;
  trackerId: string;
  lastStepOnClick?: number;
  label?: string;
  onClick?: () => void;
};

const CalibrateGen4Button = ({
  hitDelay,
  timer,
  trackerId,
  lastStepOnClick,
  label,
  onClick,
}: CalibrateGen4ButtonProps) => {
  const [, updateTimer] = useAtom(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      calibrate={async () => updateTimer({ delayHit: hitDelay })}
      lastStepOnClick={lastStepOnClick}
      onClick={onClick}
      label={label}
    />
  );
};

type Props = CalibrateGen3ButtonProps | CalibrateGen4ButtonProps;

export const CalibrateTimerButton = (props: Props) => {
  return match(props)
    .with({ type: "gen3" }, (matched) => <CalibrateGen3Button {...matched} />)
    .with({ type: "gen4" }, (matched) => <CalibrateGen4Button {...matched} />)
    .exhaustive();
};
