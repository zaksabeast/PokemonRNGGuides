import { Button } from "./button";
import { message } from "antd";
import { Gen3TimerAtom, useGen3Timer } from "~/hooks/useGen3Timer";
import {
  Gen4CalibrateSettings,
  Gen4TimerAtom,
  useGen4Timer,
} from "~/hooks/useGen4Timer";
import { match } from "ts-pattern";
import { useCurrentStep } from "./stepper/state";

type InnerCalibrateButtonProps<T> = {
  trackerId: string;
  hitValue: T;
  lastStepOnClick?: number;
  label?: string;
  calibrate: (hitValue: T) => Promise<unknown>;
  onClick?: () => void;
};

const InnerCalibrateButton = <T,>({
  trackerId,
  hitValue,
  lastStepOnClick: previousStepOnClick,
  label = "Calibrate",
  calibrate,
  onClick: _onClick,
}: InnerCalibrateButtonProps<T>) => {
  const [, setCurrentStep] = useCurrentStep();
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = async () => {
    await calibrate(hitValue);
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
  const { calibrate } = useGen3Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={hitAdvance}
      calibrate={calibrate}
      lastStepOnClick={lastStepOnClick}
      onClick={onClick}
      label={label}
    />
  );
};

type CalibrateGen4ButtonProps = {
  type: "gen4";
  calibration: Gen4CalibrateSettings;
  timer: Gen4TimerAtom;
  trackerId: string;
  lastStepOnClick?: number;
  label?: string;
  onClick?: () => void;
};

const CalibrateGen4Button = ({
  calibration,
  timer,
  trackerId,
  lastStepOnClick,
  label,
  onClick,
}: CalibrateGen4ButtonProps) => {
  const { calibrate } = useGen4Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={calibration}
      calibrate={calibrate}
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
