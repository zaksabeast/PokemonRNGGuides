import { MultiTimer } from "~/components/multiTimer";
import { EmeraldSeedToAdvances } from "./seedToAdvances";
import { useState } from "react";
import { Gen3Console, gen3ConsoleFpsMap } from "~/types/console";
import { Flex } from "~/components";

import Instructions_0_createBattleVideo from "./instructions_0_createBattleVideo.mdx";
import Instructions_1_validateFrame from "./instructions_1_validateFrame.mdx";
import Instructions_2_validateFrame from "./instructions_2_validateFrame.mdx";
import { FormState as TargetSetup } from "../wild/wild3CalibTarget";
import { gen3Leads } from "../wild/utils";
import { Wild3CalibCaughtMon } from "../wild/wild3CalibCaughtMon";
import { BattleVideo } from "../battleVideo/battleVideo";
import { formatHex } from "~/utils/formatHex";

export const PaintingReseedingTimers = ({
  frame_before_painting,
  consoleType,
}: {
  frame_before_painting: number;
  consoleType: Gen3Console;
}) => {
  const fps = gen3ConsoleFpsMap[consoleType];
  const msPerFrame = 1000 / fps;
  const calib = 30;
  const timeAtPaintingInteract = frame_before_painting - calib;
  const TIME_TO_CREATE_BATTLE_VIDEO = 3600 * 4.5;

  const millisecondsCreateVideo = [
    5000,
    timeAtPaintingInteract * msPerFrame,
    (timeAtPaintingInteract + TIME_TO_CREATE_BATTLE_VIDEO) * msPerFrame,
  ];
  const labelsCreateVideo = [
    "Soft reset START+SELECT+A+B",
    "Interact with a painting",
    "Close Battle Tower trainer opening phrase",
  ];

  const DELAY_FOR_WILD = 1000;
  const millisecondsValidateFrame = [5000, DELAY_FOR_WILD * msPerFrame];
  const labelsValidateFrame = [
    "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  return (
    <>
      <h2>Create the Battle Video</h2>
      <div>
        Target frame before painting: {frame_before_painting} (Seed:{" "}
        {formatHex(frame_before_painting, 2)})
      </div>
      <Instructions_0_createBattleVideo />

      <MultiTimer
        milliseconds={millisecondsCreateVideo}
        labels={labelsCreateVideo}
        startButtonTrackerId="painting_battle_video_timer_start"
        stopButtonTrackerId="painting_battle_video_timer_stop"
      />

      <h2>Validate the painting frame that was hit</h2>
      <Instructions_1_validateFrame />
      <MultiTimer
        milliseconds={millisecondsValidateFrame}
        labels={labelsValidateFrame}
        startButtonTrackerId="painting_battle_video_timer_start"
        stopButtonTrackerId="painting_battle_video_timer_stop"
      />
    </>
  );
};

const createTargetSetup = (frame_before_painting: number): TargetSetup => {
  return {
    map: "MAP_VICTORY_ROAD_1F",
    feebasState: "NotInMap",
    roamerState: "Inactive",
    massOutbreakState: "Inactive",
    action: "SweetScentLand",
    leadIdx: gen3Leads.indexOf("Egg"),
    usingRngManipulatedLead: false,
    usingPaintingReseeding: true,
    isPaintingSeedConfirmed: false,
    targetPaintingSeed: frame_before_painting,
    targetMethod: null,
    targetAdvance: 1000,
    usingAverageLeadCycleSpeed: true,
    leadCycleSpeed: 0,
  };
};

export const EmeraldPaintingReseeding = () => {
  const [paintingAdvs, setPaintingAdvs] = useState<{
    before: number;
    after: number;
  } | null>(null);

  const targetSetup =
    paintingAdvs === null || paintingAdvs.before === 0
      ? null
      : createTargetSetup(paintingAdvs.before);

  return (
    <Flex vertical gap={20}>
      <h2>Selecting the target painting frame and advance</h2>
      <EmeraldSeedToAdvances
        onSelected={(before, after) => {
          setPaintingAdvs({ before, after });
        }}
      />

      {paintingAdvs?.before === 0 && (
        <>
          <h2>Create Battle Video (without Painting Reseeding)</h2>
          <BattleVideo
            fixedData={{
              targetAdvance: paintingAdvs.after,
              isUpdatingExisting: false,
            }}
          />
        </>
      )}

      {paintingAdvs !== null && paintingAdvs.before !== 0 && (
        <PaintingReseedingTimers
          consoleType="GBA"
          frame_before_painting={paintingAdvs.before}
        />
      )}

      {targetSetup != null && (
        <Wild3CalibCaughtMon
          targetSetup={targetSetup}
          setLatestHitAdv={() => {
            /*NO_PROD */
          }}
        />
      )}

      {targetSetup != null && <Instructions_2_validateFrame />}
    </Flex>
  );
};
