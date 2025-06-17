import React from "react";
import { Button } from "~/components";
import { message } from "antd";
import { Gen3TimerAtom, useGen3Timer } from "~/hooks/useGen3Timer";
import { Gen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";
import { match } from "ts-pattern";
import { useCurrentStep } from "./stepper/state";

type InnerCalibrateButtonProps = {
  trackerId: string;
  hitValue: number;
  previousStepOnClick?: boolean;
  calibrate: (hitValue: number) => Promise<void>;
  onClick?: () => void;
};

const InnerCalibrateButton = ({
  trackerId,
  hitValue,
  previousStepOnClick,
  calibrate,
  onClick: _onClick,
}: InnerCalibrateButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = React.useCallback(async () => {
    await calibrate(hitValue);
    if (previousStepOnClick) {
      setCurrentStep((step) => step - 1);
    }
    messageApi.success("Calibrated timer");
    _onClick?.();
  }, [
    calibrate,
    hitValue,
    messageApi,
    previousStepOnClick,
    setCurrentStep,
    _onClick,
  ]);

  return (
    <>
      {contextHolder}
      <Button trackerId={trackerId} onClick={onClick}>
        Calibrate
      </Button>
    </>
  );
};

type CalibrateGen3ButtonProps = {
  type: "gen3";
  hitAdvance: number;
  timer: Gen3TimerAtom;
  trackerId: string;
  previousStepOnClick?: boolean;
  onClick?: () => void;
};

const CalibrateGen3Button = ({
  hitAdvance,
  timer,
  trackerId,
  previousStepOnClick,
  onClick,
}: CalibrateGen3ButtonProps) => {
  const { calibrate } = useGen3Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={hitAdvance}
      calibrate={calibrate}
      previousStepOnClick={previousStepOnClick}
      onClick={onClick}
    />
  );
};

type CalibrateGen4ButtonProps = {
  type: "gen4";
  hitDelay: number;
  timer: Gen4TimerAtom;
  trackerId: string;
  previousStepOnClick?: boolean;
  onClick?: () => void;
};

const CalibrateGen4Button = ({
  hitDelay,
  timer,
  trackerId,
  previousStepOnClick,
  onClick,
}: CalibrateGen4ButtonProps) => {
  const { calibrate } = useGen4Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={hitDelay}
      calibrate={calibrate}
      previousStepOnClick={previousStepOnClick}
      onClick={onClick}
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
