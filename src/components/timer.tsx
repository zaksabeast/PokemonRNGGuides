import React from "react";
import { Flex, Typography } from "~/components";
import { useCanvasTimer, CANVAS_SIZE } from "~/hooks/useCanvasTimer";
import styled from "@emotion/styled";

const CanvasContainer = styled.div({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const TimerCanvas = styled.canvas({
  display: "block",
  width: 200,
  height: 200,
  imageRendering: "crisp-edges",
});

type Props = {
  expirationMs: number;
  countdownMs: number;
  run: boolean;
  startTimeMs?: number | null;
  timerStartOffset?: number;
  onExpire?: () => void;
  label?: React.ReactNode;
};

export const Timer = ({
  expirationMs,
  countdownMs,
  run,
  startTimeMs,
  timerStartOffset = 0,
  onExpire,
  label,
}: Props) => {
  const { canvasRef, start, stop } = useCanvasTimer({
    onExpire,
    expirationMs,
    countdownMs,
    startTimeMs,
    timerStartOffset,
  });

  React.useEffect(() => {
    if (run) {
      start();
    } else {
      stop();
    }
  }, [run, start, stop]);

  return (
    <Flex vertical align="center">
      <CanvasContainer>
        <TimerCanvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </CanvasContainer>
      {label != null && (
        <Flex justify="center" textAlign="center" maxWidth={CANVAS_SIZE}>
          <Typography.Text fontSize={16}>{label}</Typography.Text>
        </Flex>
      )}
    </Flex>
  );
};
