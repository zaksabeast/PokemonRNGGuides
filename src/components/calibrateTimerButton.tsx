import React from "react";
import { Button } from "~/components";
import { message } from "antd";
import { Gen3TimerAtom, useGen3Timer } from "~/hooks/useGen3Timer";
import { Gen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";
import { match } from "ts-pattern";

type InnerCalibrateButtonProps = {
  trackerId: string;
  hitValue: number;
  calibrate: (hitValue: number) => Promise<void>;
  onClick?: () => void;
};

const InnerCalibrateButton = ({
  trackerId,
  hitValue,
  calibrate,
  onClick: _onClick,
}: InnerCalibrateButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = React.useCallback(async () => {
    await calibrate(hitValue);
    messageApi.success("Calibrated timer");
    _onClick?.();
  }, [calibrate, hitValue, messageApi, _onClick]);

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
  onClick?: () => void;
};

const CalibrateGen3Button = ({
  hitAdvance,
  timer,
  trackerId,
  onClick,
}: CalibrateGen3ButtonProps) => {
  const { calibrate } = useGen3Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={hitAdvance}
      calibrate={calibrate}
      onClick={onClick}
    />
  );
};

type CalibrateGen4ButtonProps = {
  type: "gen4";
  hitDelay: number;
  timer: Gen4TimerAtom;
  trackerId: string;
  onClick?: () => void;
};

const CalibrateGen4Button = ({
  hitDelay,
  timer,
  trackerId,
  onClick,
}: CalibrateGen4ButtonProps) => {
  const { calibrate } = useGen4Timer(timer);

  return (
    <InnerCalibrateButton
      trackerId={trackerId}
      hitValue={hitDelay}
      calibrate={calibrate}
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
