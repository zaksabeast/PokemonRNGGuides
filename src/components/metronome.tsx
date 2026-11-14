import styled from "@emotion/styled";
import { Flex } from "./flex";
import { Button } from "./button";
import { SelectField, type SelectOption } from "./form";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Metronome } from "~/hooks/useMetronome";

const offsetOptions: SelectOption<number>[] = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900,
].map((ms) => ({ label: `${ms}ms`, value: ms }));

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
    <Flex gap={16} justify="space-between" align="flex-end">
      <Flex vertical width={140}>
        <SelectField<number>
          label="3ds Offset"
          tooltip={{
            title: "3ds Offset",
            description:
              "Enable this only if you have a second offset of 1 after several RNG attempts.",
          }}
          value={offset}
          options={offsetOptions}
          onChange={setOffset}
        />
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
