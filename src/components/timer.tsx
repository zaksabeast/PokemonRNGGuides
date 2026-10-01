import React from "react";
import { Flex, Typography } from "~/components";
import {
  useCanvasTimer,
  CANVAS_SIZE,
  type TimerColors,
  type TimerRenderer,
} from "~/hooks/useCanvasTimer";
import styled from "@emotion/styled";
import { useComputedCssVar } from "~/hooks/useComputedCssVar";
import { styledPropGuard } from "~/utils/styled";

const CanvasContainer = styled.div({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const TimerCanvas = styled(
  "canvas",
  styledPropGuard,
)<{ $width: number; $height: number; $crispEdges: boolean }>(
  ({ $width, $height, $crispEdges }) => ({
    display: "block",
    width: $width,
    height: $height,
    // Crisp edges suits the default ring, but degrades an antialiased arc
    imageRendering: $crispEdges ? "crisp-edges" : "auto",
  }),
);

const Overlay = styled.div({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

type Props = {
  expirationMs: number;
  countdownMs: number;
  run: boolean;
  startTimeMs?: number | null;
  timerStartOffset?: number;
  onExpire?: () => void;
  label?: React.ReactNode;
  render?: TimerRenderer;
  canvasWidth?: number;
  canvasHeight?: number;
  overlay?: React.ReactNode;
};

export const Timer = ({
  expirationMs,
  countdownMs,
  run,
  startTimeMs,
  timerStartOffset = 0,
  onExpire,
  label,
  render,
  canvasWidth = CANVAS_SIZE,
  canvasHeight = CANVAS_SIZE,
  overlay,
}: Props) => {
  const colors: TimerColors = {
    background: useComputedCssVar("--ant-color-fill-content-hover") ?? "",
    ringActive: useComputedCssVar("--ant-color-primary") ?? "",
    ringFlash: useComputedCssVar("--ant-color-warning-active") ?? "",
    text: useComputedCssVar("--ant-color-text") ?? "",
  };

  const { canvasRef, start, stop } = useCanvasTimer({
    onExpire,
    expirationMs,
    countdownMs,
    startTimeMs,
    timerStartOffset,
    colors,
    render,
    width: canvasWidth,
    height: canvasHeight,
  });

  React.useEffect(() => {
    if (run) {
      start();
    } else {
      stop();
    }
  }, [
    run,
    start,
    stop,
    startTimeMs,
    expirationMs,
    countdownMs,
    timerStartOffset,
  ]);

  return (
    <Flex vertical align="center">
      <CanvasContainer>
        <TimerCanvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          $width={canvasWidth}
          $height={canvasHeight}
          $crispEdges={render == null}
        />
        {overlay != null && <Overlay>{overlay}</Overlay>}
      </CanvasContainer>
      {label != null && (
        <Flex justify="center" textAlign="center" maxWidth={canvasWidth}>
          <Typography.Text fontSize={16}>{label}</Typography.Text>
        </Flex>
      )}
    </Flex>
  );
};
