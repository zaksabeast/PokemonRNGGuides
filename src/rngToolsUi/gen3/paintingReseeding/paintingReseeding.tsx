import { MultiTimer } from "~/components/multiTimer";
import { EmeraldSeedToAdvances } from "./seedToAdvances";
import { useState } from "react";
import { GBA_FPS } from "~/utils/consts";
import { Gen3Console, gen3ConsoleFpsMap } from "~/types/console";
import { Flex, Typography } from "~/components";

export const PaintingReseedingTimers = ({
  frame_before_painting,
  consoleType,
}: {
  frame_before_painting: number;
  consoleType: Gen3Console;
}) => {
  const fps = gen3ConsoleFpsMap[consoleType];
  const calib = 30;
  const timeAtPaintingInteract = frame_before_painting - calib;
  const TIME_TO_CREATE_BATTLE_VIDEO = 3600 * 4.5;

  const millisecondsCreateVideo = [
    5000,
    timeAtPaintingInteract / fps,
    (timeAtPaintingInteract + TIME_TO_CREATE_BATTLE_VIDEO) / fps,
  ];
  const labelsCreateVideo = [
    "Soft reset START+SELECT+A+B",
    "Interact with a painting",
    "Close Battle Tower trainer opening phrase",
  ];

  const DELAY_FOR_WILD = 1000;
  const millisecondsValidateFrame = [5000, DELAY_FOR_WILD / fps];
  const labelsValidateFrame = [
    "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  return (
    <>
      <Typography.Text strong>Creating the Battle Video</Typography.Text>

      <MultiTimer
        milliseconds={millisecondsCreateVideo}
        labels={labelsCreateVideo}
        startButtonTrackerId="painting_battle_video_timer_start"
        stopButtonTrackerId="painting_battle_video_timer_stop"
      />

      <Typography.Text strong>
        Validating the painting frame that was hit
      </Typography.Text>
      <MultiTimer
        milliseconds={millisecondsValidateFrame}
        labels={labelsValidateFrame}
        startButtonTrackerId="painting_battle_video_timer_start"
        stopButtonTrackerId="painting_battle_video_timer_stop"
      />
    </>
  );
};

export const EmeraldPaintingReseeding = () => {
  const [frame_before_painting, setFrameBeforePainting] = useState<number>(0);
  return (
    <Flex vertical>
      <EmeraldSeedToAdvances
        onSelected={(before, after) => {
          setFrameBeforePainting(before);
        }}
      />

      {frame_before_painting !== 0 && (
        <PaintingReseedingTimers
          consoleType="GBA"
          frame_before_painting={frame_before_painting}
        />
      )}
    </Flex>
  );
};
