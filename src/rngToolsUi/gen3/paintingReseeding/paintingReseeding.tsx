import { MultiTimer } from "~/components/multiTimer";
import { EmeraldSeedToAdvances } from "./seedToAdvances";
import { useState } from "react";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import { Button, Field, Flex, FormFieldTable, NumberInput, Select } from "~/components";

import Instructions_0_createBattleVideo from "./instructions_0_createBattleVideo.mdx";
import Instructions_1_validateFrame from "./instructions_1_validateFrame.mdx";
import Instructions_2_validateFrame from "./instructions_2_validateFrame.mdx";
import { TargetSetup as TargetSetup } from "../wild/wild3CalibTarget";
import { gen3Leads } from "../wild/utils";
import { Wild3CalibCaughtMon } from "../wild/wild3CalibCaughtMon";
import { BattleVideo, BattleVideoInfo } from "../battleVideo/battleVideo";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import React from "react";
import { Wild3Action } from "~/rngTools";

const FRAME_BATTLE_VIDEO_TO_SWEET_SCENT = 60 * 10; // ~10s
const NON_VBLANK_ADV_BATTLE_VIDEO_TO_SWEET_SCENT = 210;
const APPROX_ADV_BATTLE_VIDEO_TO_SWEET_SCENT =
  FRAME_BATTLE_VIDEO_TO_SWEET_SCENT +
  NON_VBLANK_ADV_BATTLE_VIDEO_TO_SWEET_SCENT;

const FRAME_PAINTING_TO_BATTLE_VIDEO = 60 * 80; // ~80s
const NON_VBLANK_ADV_PAINTING_TO_BATTLE_VIDEO = 380;
const APPROX_ADV_PAINTING_TO_BATTLE_VIDEO =
  FRAME_PAINTING_TO_BATTLE_VIDEO + NON_VBLANK_ADV_PAINTING_TO_BATTLE_VIDEO;

const DEFAULT_CALIB_FOR_PAINTING = 30;
const MIN_ADV_FOR_BATTLE_VIDEO = 6000; // Otherwise, the tool will say that the advance is too small.

export const PaintingReseedingTimers = ({
  frame_before_painting,
  existingBattleVideoAdv,
  consoleType,
  calibration,
  setCalibration,
}: {
  frame_before_painting: number;
  existingBattleVideoAdv: number;
  consoleType: Gen3Console;
  calibration: number;
  setCalibration: (calibration: number) => void;
}) => {
  const fps = gen3ConsoleFpsMap[consoleType];

  const msPerFrame = 1000 / fps;
  const timeAtPaintingInteract = frame_before_painting - calibration;

  const millisecondsCreateVideo = [
    5000,
    timeAtPaintingInteract * msPerFrame,
    FRAME_PAINTING_TO_BATTLE_VIDEO * msPerFrame,
  ];
  const labelsCreateVideo = [
    "Soft reset START+SELECT+A+B",
    "Interact with the painting",
    "Close Battle Tower trainer opening phrase",
  ];

  const millisecondsValidateFrame = [
    5000,
    FRAME_BATTLE_VIDEO_TO_SWEET_SCENT * msPerFrame,
  ];
  const labelsValidateFrame = ["Close the Battle Video", "Trigger Sweet Scent"];

  const fields: Field[] = [
    {
      label: "Target frame before painting",
      input: `${formatLargeInteger(frame_before_painting)} (Seed: ${formatHex(frame_before_painting, 2)})`,
    },
    {
      label: "Battle Video will be created at",
      input: `~${formatLargeInteger(existingBattleVideoAdv)} additional advances after painting.`,
    },
    {
      label: "Calibration + Offset (advance)",
      input: (
        <NumberInput
          value={calibration}
          numType="decimal"
          onChange={(val) => setCalibration(val ?? 0)}
        />
      ),
    },
  ];

  return (
    <>
      <h2>Interact with the painting and create the Battle Video</h2>
      <Instructions_0_createBattleVideo />

      <FormFieldTable fields={fields} />
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

const createTargetSetupAtVictoryRoad = (frame_before_painting: number): TargetSetup => {
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
    targetMethod: "Wild1", // Doesn't matter. Won't be used.
    targetAdvance:
      APPROX_ADV_PAINTING_TO_BATTLE_VIDEO +
      APPROX_ADV_BATTLE_VIDEO_TO_SWEET_SCENT,
    usingAverageLeadCycleSpeed: true,
    leadCycleSpeed: 0,
    usingBattleVideoWithoutPainting: false,
    existingBattleVideoAdv: APPROX_ADV_PAINTING_TO_BATTLE_VIDEO,
  };
};

type Props = {
  targetPaintingAdvs?: {
    before: number;
    after: number;
  },
  consoleType?: Gen3Console;
  onBattleVideoCreated?: (info: BattleVideoInfo) => void;
  targetAction?: Wild3Action;
};

export const EmeraldPaintingReseeding = ({
  targetPaintingAdvs: targetPaintingAdvsProp,
  consoleType: consoleTypeProp,
  onBattleVideoCreated,
  targetAction,
}: Props) => {
  const [targetPaintingAdvs, setTargetPaintingAdvs] = useState<{
    before: number;
    after: number;
  } | null>(targetPaintingAdvsProp ?? null);

  const [
    battleVideoAdvAfterPaintingConfirmed,
    setBattleVideoAdvAfterPaintingConfirmed,
  ] = useState<number | null>(null);
  const [calibrationForPainting, setCalibrationForPainting] = useState<number>(
    DEFAULT_CALIB_FOR_PAINTING,
  );
  const [consoleType, setConsoleType] = useState<Gen3Console>(consoleTypeProp ?? "GBA");

  const targetSetupAtVictoryRoad =
    targetPaintingAdvs === null || targetPaintingAdvs.before === 0
      ? null
      : createTargetSetupAtVictoryRoad(targetPaintingAdvs.before);

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

  const setLatestHitAdv = (hitAdv: { frame_before_painting: number, adv_after_painting: number }) => {
    if (targetPaintingAdvs == null) {
      return;
    }

    const distBefore =
      hitAdv.frame_before_painting - targetPaintingAdvs.before;
    if (distBefore === 0) { // Painting frame was hit
      const battleVideoAdvAfterPainting = hitAdv.adv_after_painting -
        APPROX_ADV_BATTLE_VIDEO_TO_SWEET_SCENT;

      setBattleVideoAdvAfterPaintingConfirmed(battleVideoAdvAfterPainting);
    } else {
      setCalibrationForPainting(calibrationForPainting + distBefore);
    }
  };

  const setBattleVideoAdv = (onBattleVideoCreated == null || targetPaintingAdvs == null) ? undefined : (adv: number | null) => {
    onBattleVideoCreated({
      targetPaintingAdvs,
      battleVideoAdvAfterPainting: adv ?? 0,
      consoleType: adv == null ? null : consoleType,
    });
  };

  return (
    <Flex vertical gap={20}>
      {targetPaintingAdvsProp == null && <>
        <h2>Selecting the target painting frame and advance</h2>
        <div>
          Fill the fields, press Generate and select the row with the smallest
          time to create Battle Video.
        </div>
      </>}
      {consoleTypeProp == null && <FormFieldTable fields={[consoleField]} />}
      {targetPaintingAdvsProp == null && <>
        <EmeraldSeedToAdvances
          onSelected={(before, after) => {
            setTargetPaintingAdvs({ before, after });
          }}
        />
      </>}

      {targetPaintingAdvs?.before === 0 && targetPaintingAdvs?.after >= MIN_ADV_FOR_BATTLE_VIDEO && (
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
              action: targetAction,
            }}
            setBattleVideoAdv={setBattleVideoAdv}
          />
        </>
      )}

      {setBattleVideoAdv != null && targetPaintingAdvs?.before === 0 && targetPaintingAdvs?.after < MIN_ADV_FOR_BATTLE_VIDEO && (
        <Flex>
          <div>No need to create Battle Video, because the number of advances is very small.</div>
          <Button trackerId="wild3_battle_video_skip" onClick={() => {
            setBattleVideoAdv(null);
          }}>Go to next step (no Battle Video created)</Button>
        </Flex>
      )}

      {targetPaintingAdvs !== null && targetPaintingAdvs.before !== 0 && (
        <PaintingReseedingTimers
          consoleType={consoleType}
          existingBattleVideoAdv={targetSetupAtVictoryRoad?.existingBattleVideoAdv ?? 0}
          frame_before_painting={targetPaintingAdvs.before}
          calibration={calibrationForPainting}
          setCalibration={setCalibrationForPainting}
        />
      )}

      {targetSetupAtVictoryRoad != null && (
        <Wild3CalibCaughtMon
          targetSetup={targetSetupAtVictoryRoad}
          setLatestHitAdv={setLatestHitAdv}
        />
      )}

      {targetSetupAtVictoryRoad != null && <Instructions_2_validateFrame />}

      {battleVideoAdvAfterPaintingConfirmed == null && targetSetupAtVictoryRoad != null && <Flex>
        <Button trackerId="wild3_painting_force_calib" onClick={() => {
          setBattleVideoAdvAfterPaintingConfirmed(APPROX_ADV_PAINTING_TO_BATTLE_VIDEO);
        }}>Assume painting frame was hit</Button>
      </Flex>}

      {battleVideoAdvAfterPaintingConfirmed !== null &&
        targetPaintingAdvs !== null && (
          <>
            <h2>Update Battle Video</h2>
            <BattleVideo
              key={`${targetPaintingAdvs.after}-${consoleType}-${battleVideoAdvAfterPaintingConfirmed}`}
              fixedData={{
                consoleType,
                targetAdvance: targetPaintingAdvs.after,
                isUpdatingExisting: true,
                existingBattleVideoAdv: battleVideoAdvAfterPaintingConfirmed,
                isAfterPainting: true,
                action: targetAction,
              }}
              setBattleVideoAdv={setBattleVideoAdv}
            />
          </>
        )}

    </Flex>
  );
};
