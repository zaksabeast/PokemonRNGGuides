import { Button } from "~/components";
import { message } from "antd";
import { Gen3TimerAtom } from "~/rngToolsUi/timer/atoms";
import { useAtom } from "jotai";

type Props = {
  hitAdvance: number;
  timer: Gen3TimerAtom;
};

export const CalibrateButton = ({ hitAdvance, timer }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [, updateTimer] = useAtom(timer);

  const onClick = async () => {
    await updateTimer({ hit_advance: hitAdvance });
    messageApi.success("Calibrated timer");
  };

  return (
    <>
      {contextHolder}
      <Button trackerId="calibrate_obtained_retail_tid" onClick={onClick}>
        Calibrate
      </Button>
    </>
  );
};
