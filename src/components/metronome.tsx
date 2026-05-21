import styled from "@emotion/styled";
import { Tooltip } from "antd";
import { Flex } from "./flex";
import { Icon } from "./icons";
import { Button } from "./button";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Select } from "./select";
import { Typography } from "./typography";
import { Metronome } from "~/hooks/useMetronome";
import { toOptions } from "~/utils/options";

const options = toOptions(
  [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  (ms) => `${ms}ms`,
);

const NoTransitionButton = styled(Button)({
  transition: "none",
});

type MetronomeProps = Metronome;

export const MetronomeButton = ({
  offset,
  setOffset,
  justTicked,
  isRunning,
  runMetronome,
}: MetronomeProps) => {
  const route = useActiveRoute();

  return (
    <Flex gap={16} justify="space-between" align="center">
      <Flex gap={16} align="center">
        <Tooltip title="Enable this only if you have a second offset of 1 after several RNG attempts.">
          <Flex gap={8}>
            <Typography.Text strong>3ds Offset</Typography.Text>
            <Icon name="InformationCircle" size={16} />
          </Flex>
        </Tooltip>
        <Flex width={100}>
          <Select
            fullFlex
            value={offset}
            options={options}
            onChange={setOffset}
          />
        </Flex>
      </Flex>
      <NoTransitionButton
        flex={1}
        backgroundColor={justTicked ? "SuccessBg" : "BgBase"}
        backgroundHoverColor={justTicked ? "SuccessBg" : "BgBase"}
        color="TextBase"
        trackerId={`${route}-metronome`}
        onClick={() => runMetronome(!isRunning)}
      >
        {isRunning ? "Stop" : "Start"} 3ds Helper
      </NoTransitionButton>
    </Flex>
  );
};
