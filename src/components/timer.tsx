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
  label?: React.ReactNode;
};

export const Timer = ({
  expirationMs,
  countdownMs,
  run,
  onExpire,
  onCountdown,
  label,
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
  const WIDTH = 200;

  return (
    <Flex vertical>
      <Progress
        type="circle"
        percent={percent}
        size={WIDTH}
        format={() => (
          <Flex justify="center">
            <Typography.Text strong fontSize={24} fontFamily="monospace">
              {seconds.toString().padStart(2, "0")}:
              {milliseconds.toString().padStart(3, "0")}
            </Typography.Text>
          </Flex>
        )}
      />
      {label != null && (
        <Flex justify="center" textAlign="center">
          <Typography.Text fontSize={20} maxWidth={WIDTH}>
            {label}
          </Typography.Text>
        </Flex>
      )}
    </Flex>
  );
};
