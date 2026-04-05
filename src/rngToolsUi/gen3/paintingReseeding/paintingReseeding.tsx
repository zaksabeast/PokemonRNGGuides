import { MultiTimer } from "~/components/multiTimer";
import { EmeraldSeedToAdvances } from "./seedToAdvances";
import { useState } from "react";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import { Field, Flex, FormFieldTable, Select } from "~/components";

import Instructions_0_createBattleVideo from "./instructions_0_createBattleVideo.mdx";
import Instructions_1_validateFrame from "./instructions_1_validateFrame.mdx";
import Instructions_2_validateFrame from "./instructions_2_validateFrame.mdx";
import { FormState as TargetSetup } from "../wild/wild3CalibTarget";
import { gen3Leads } from "../wild/utils";
import { Wild3CalibCaughtMon } from "../wild/wild3CalibCaughtMon";
import { BattleVideo } from "../battleVideo/battleVideo";
import { formatHex } from "~/utils/formatHex";

const TIME_TO_CREATE_BATTLE_VIDEO = 3600 * 4.5;

export const PaintingReseedingTimers = ({
  frame_before_painting,
  consoleType,
  calibration,
}: {
  frame_before_painting: number;
  consoleType: Gen3Console;
  calibration: number;
}) => {
  const fps = gen3ConsoleFpsMap[consoleType];

  const msPerFrame = 1000 / fps;
  const timeAtPaintingInteract = frame_before_painting - calibration;

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

      <h2>Validate that the painting frame was hit</h2>
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
    targetFrameBeforePainting: frame_before_painting,
    targetMethod: null,
    targetAdvance: 1000,
    usingAverageLeadCycleSpeed: true,
    leadCycleSpeed: 0,
    usingBattleVideoWithoutPainting: false,
    existingBattleVideoAdv: TIME_TO_CREATE_BATTLE_VIDEO, //NO_PROD
  };
};

export const EmeraldPaintingReseeding = () => {
  const [targetPaintingAdvs, setTargetPaintingAdvs] = useState<{
    before: number;
    after: number;
  } | null>(null);

  const [battleVideoAdvAfterPainting, setBattleVideoAdvAfterPainting] =
    useState<number | null>(null);
  const [calibrationForPainting, setCalibrationForPainting] =
    useState<number>(30);
  const [consoleType, setConsoleType] = useState<Gen3Console>("GBA");

  const targetSetup =
    targetPaintingAdvs === null || targetPaintingAdvs.before === 0
      ? null
      : createTargetSetup(targetPaintingAdvs.before);

  const consoleField: Field = {
    label: "Console",
    input: (
      <Select<Gen3Console>
        name="console"
        value={consoleType}
        options={gen3ConsoleOptions}
        onSelect={(val) => {
          setConsoleType(val);
        }}
      />
    ),
  };

  return (
    <Flex vertical gap={20}>
      <h2>Selecting the target painting frame and advance</h2>
      <div>
        Fill the fields, press Generate and select the row with the smallest
        time to create Battle Video.
      </div>
      <FormFieldTable fields={[consoleField]} />
      <EmeraldSeedToAdvances
        onSelected={(before, after) => {
          setTargetPaintingAdvs({ before, after });
        }}
        alwaysShowAdvancedSettings={false}
      />

      {targetPaintingAdvs?.before === 0 && (
        <>
          <h2>Create Battle Video (without Painting Reseeding)</h2>
          <BattleVideo
            key={`${targetPaintingAdvs.after}-${consoleType}`}
            fixedData={{
              targetAdvance: targetPaintingAdvs.after,
              consoleType,
              isUpdatingExisting: false,
              existingBattleVideoAdv: 0,
              isAfterPainting: false,
            }}
          />
        </>
      )}

      {targetPaintingAdvs !== null && targetPaintingAdvs.before !== 0 && (
        <PaintingReseedingTimers
          consoleType={consoleType}
          frame_before_painting={targetPaintingAdvs.before}
          calibration={calibrationForPainting}
        />
      )}

      {targetSetup != null && (
        <Wild3CalibCaughtMon
          targetSetup={targetSetup}
          setLatestHitAdv={(hitAdv) => {
            if (targetPaintingAdvs == null) {
              return;
            }

            const distBefore =
              targetPaintingAdvs.before - hitAdv.frame_before_painting;
            if (distBefore !== 0) {
              setBattleVideoAdvAfterPainting(hitAdv.adv_after_painting);
            } else {
              setCalibrationForPainting(calibrationForPainting + distBefore);
            }
          }}
        />
      )}

      {targetSetup != null && <Instructions_2_validateFrame />}

      {battleVideoAdvAfterPainting !== null && targetPaintingAdvs !== null && (
        <>
          <h2>Update Battle Video</h2>
          <BattleVideo
            key={`${targetPaintingAdvs.after}-${consoleType}-${battleVideoAdvAfterPainting}`}
            fixedData={{
              consoleType,
              targetAdvance: targetPaintingAdvs.after,
              isUpdatingExisting: true,
              existingBattleVideoAdv: battleVideoAdvAfterPainting,
              isAfterPainting: true,
            }}
          />
        </>
      )}
    </Flex>
  );
};
