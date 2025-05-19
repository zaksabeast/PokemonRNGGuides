import React from "react";
import { Button } from "~/components";
import { message } from "antd";
import { Gen3TimerAtom, useGen3Timer } from "~/hooks/useGen3Timer";

type Props = {
  hitAdvance: number;
  timer: Gen3TimerAtom;
};

export const CalibrateButton = ({ hitAdvance, timer }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { calibrate } = useGen3Timer(timer);

  const onClick = React.useCallback(async () => {
    await calibrate(hitAdvance);
    messageApi.success("Calibrated timer");
  }, [calibrate, hitAdvance, messageApi]);

  return (
    <>
      {contextHolder}
      <Button
        trackerId="calibrate_obtained_retail_emerald_held_egg"
        onClick={onClick}
      >
        Calibrate
      </Button>
    </>
  );
};
