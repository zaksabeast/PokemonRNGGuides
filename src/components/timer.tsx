import React from "react";
import { Flex, Typography } from "~/components";
import { Progress } from "antd";
import { useTimer } from "~/hooks/useTimer";

type Props = {
  expirationMs: number;
  countdownMs: number;
  run: boolean;
  onExpire?: () => void;
  onCountdown?: () => void;
};

export const Timer = ({
  expirationMs,
  countdownMs,
  run,
  onExpire,
  onCountdown,
}: Props) => {
  const { msRemaining, start, stop } = useTimer({
    onExpire,
    onCountdown,
    expirationMs,
    countdownMs,
  });

  React.useEffect(() => {
    if (run) {
      start();
    } else {
      stop();
    }
  }, [run, start, stop]);

  const remaining = Math.floor(msRemaining);
  const percent = (remaining / expirationMs) * 100;
  const seconds = Math.floor(remaining / 1000);
  const milliseconds = remaining % 1000;

  return (
    <Progress
      type="circle"
      percent={percent}
      size={200}
      format={() => (
        <Flex justify="center">
          <Typography.Text strong fontSize={24} fontFamily="monospace">
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(3, "0")}
          </Typography.Text>
        </Flex>
      )}
    />
  );
};
