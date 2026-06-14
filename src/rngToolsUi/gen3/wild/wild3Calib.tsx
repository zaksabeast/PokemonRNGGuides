import React from "react";
import { Flex, MultiTimer, Field, Button } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetSetup } from "./wild3TargetSetupInput";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon.component";
import { Gen3Console, gen3ConsoleFpsMap } from "~/types/console";
import { formatActionName, formatLeadName, formatMapName } from "./utils";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { AllOrNone } from "~/types";
import { BattleVideoInfoInput } from "../battleVideo/calibBattleVideoInfoInput";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { Gen3Method } from "~/rngTools";

import Instructions_calib_with_battle_video from "./instructions_calib_with_battle_video.mdx";
import Instructions_calib_without_battle_video from "./instructions_calib_without_battle_video.mdx";
import Instructions_calib_wrong_method from "./instructions_calib_wrong_method.mdx";
import { Wild3LeadCycleSpeedSelector } from "./wild3LeadCycleSpeedSelector";
import { Wild3Action } from "../../../../rng_tools/pkg/rng_tools";
import { Wild3PokeblockDescription } from "~/components/wild3Pokeblock";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  FASTEST_LEAD_CYCLE_SPEED,
  SLOWEST_LEAD_CYCLE_SPEED,
} from "./wild3LeadCycleSpeedInput";
import { match } from "ts-pattern";
import { Wild3TargetSetupAndLeadInput } from "./wild3TargetSetupAndLeadInput";
import {
  buildGen3CalibFields,
  buildGen3CalibPreviousStepFields,
  CalibOffset,
} from "../pokemonRng/calib";

const FISHING_CALIB_OFFSET: CalibOffset = {
  offset: 4,
  // assuming x2 fishing attempts and using SELECT to activate rod, (+3 advs per attempt)
  calibNoBattleVideo: 17,
  calibBattleVideo: 11,
};

const CALIB_OFFSET_BY_ACTION = {
  OldRod: FISHING_CALIB_OFFSET,
  GoodRod: FISHING_CALIB_OFFSET,
  SuperRod: FISHING_CALIB_OFFSET,
  SweetScentLand: {
    offset: 264,
    calibNoBattleVideo: 10,
    calibBattleVideo: 6, // (SetSaveBlocksPointers + x2 MoveSaveBlocks_ResetHeap) called twice
  },
  SweetScentWater: {
    offset: 354,
    calibNoBattleVideo: 10,
    calibBattleVideo: 6,
  },
  RockSmash: {
    // assuming interacting with the rock from the overworld
    offset: 301,
    calibNoBattleVideo: 10,
    calibBattleVideo: 6,
  },
} as const satisfies Record<Wild3Action, CalibOffset>;

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
  leadCycleSpeed: number;
  clearAll?: () => void;
  displayInstructions?: boolean;
}>;

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
  leadCycleSpeed: leadCycleSpeedProp,
  battleVideoInfo: battleVideoInfoProp,
  clearAll,
  displayInstructions = true,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    targetSetupProp ?? null,
  );
  const [targetSetupHasEncounter, setTargetSetupHasEncounter] =
    React.useState(false);

  React.useEffect(() => {
    setTargetSetup(targetSetupProp ?? null);
  }, [targetSetupProp]);

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  const [overwriteLeadCycleSpeed, setOverwriteLeadCycleSpeed] = React.useState<
    number | null
  >(null);

  const finalLeadCycleSpeed =
    overwriteLeadCycleSpeed ?? leadCycleSpeedProp ?? AVERAGE_LEAD_CYCLE_SPEED;

  React.useEffect(() => {
    if (targetSetup == null) {
      setTargetSetupHasEncounter(false);
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup, finalLeadCycleSpeed).then(
      ({ content, hasEncounter }) => {
        setTargetSetupResult(content);
        setTargetSetupHasEncounter(hasEncounter);
      },
    );
  }, [finalLeadCycleSpeed, targetSetup]);

  const [battleVideoInfo, setBattleVideoInfo] =
    React.useState<BattleVideoInfo | null>(battleVideoInfoProp ?? null);

  React.useEffect(() => {
    setBattleVideoInfo(battleVideoInfoProp ?? null);
  }, [battleVideoInfoProp]);

  const [consoleTypeFromInput, setConsoleTypeFromInput] =
    React.useState<Gen3Console>("GBA");

  const [humanInputDelay, setHumanInputDelay] = React.useState<number | null>(
    0,
  );
  const [hasHitTargetAdv, setHasHitTargetAdv] = React.useState(false);

  React.useEffect(() => {
    setOverwriteLeadCycleSpeed(null);
  }, [targetSetupProp]);

  React.useEffect(() => {
    setHasHitTargetAdv(false);
  }, [targetSetup]);

  const targetSetupInputForm = () => (
    <Wild3TargetSetupAndLeadInput
      setTargetSetup={setTargetSetup}
      setLeadCycleSpeed={setOverwriteLeadCycleSpeed}
      leadCycleSpeed={finalLeadCycleSpeed}
      displayInstructions={displayInstructions}
      permitEnablingDebugOptions={false}
      initialDisplayLeadCycleSpdButton
    />
  );

  const leadCycleSpeedToText = (spd: number) => {
    return match(spd)
      .with(AVERAGE_LEAD_CYCLE_SPEED, () => `Average`)
      .with(FASTEST_LEAD_CYCLE_SPEED, () => `Fastest (${spd})`)
      .with(SLOWEST_LEAD_CYCLE_SPEED, () => `Slowest (${spd})`)
      .otherwise(() => `${spd}`);
  };

  const setLatestHitAdv = (
    hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    },
    hitMethod: Gen3Method,
  ) => {
    if (
      hitAdv.adv_after_painting === targetSetup?.targetPaintingAdvs.after &&
      hitMethod !== targetSetup?.targetMethod
    ) {
      setHasHitTargetAdv(true);
    }

    setHumanInputDelay(
      (humanInputDelay ?? 0) + hitAdv.adv_after_painting - targetForTimer,
    );
  };

  const targetForTimer = targetSetup?.targetPaintingAdvs.after ?? 0;

  const initialAdv = battleVideoInfo?.battleVideoAdvAfterPainting ?? 0;

  const { offset, calibBattleVideo, calibNoBattleVideo } =
    CALIB_OFFSET_BY_ACTION[targetSetup?.action ?? "SweetScentLand"];

  const calibration = initialAdv > 0 ? calibBattleVideo : calibNoBattleVideo;

  const advFromTimer =
    targetForTimer - initialAdv - (humanInputDelay ?? 0) - offset - calibration;

  const consoleType = battleVideoInfo?.consoleType ?? consoleTypeFromInput;

  const milliseconds = [
    5000,
    Math.round((advFromTimer / gen3ConsoleFpsMap[consoleType]) * 1000),
  ];
  const labels = [
    initialAdv > 0 ? "Close the Battle Video" : "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  const battleVideoInfoInputForm = () => {
    if (targetSetup == null || !targetSetupHasEncounter) {
      return null;
    }

    return (
      <BattleVideoInfoInput
        targetPaintingAdvs={targetSetup.targetPaintingAdvs}
        setBattleVideoInfo={setBattleVideoInfo}
      />
    );
  };

  const calibFields: Field[] = [
    ...buildGen3CalibFields({
      battleVideoInfoProp,
      consoleTypeFromInput,
      setConsoleTypeFromInput,
      calibration,
      offset,
      humanInputDelay,
      setHumanInputDelay,
    }),
    {
      label: "Lead cycle speed (from calibration)",
      input: leadCycleSpeedToText(overwriteLeadCycleSpeed ?? 0),
      show: overwriteLeadCycleSpeed !== null,
    },
  ];

  const canDoCalib =
    battleVideoInfo != null || targetSetup?.targetPaintingAdvs.before === 0;

  const infoFromPrevSteps = () => {
    if (targetSetupProp == null) {
      return null;
    }

    const fields: Field[] = [
      {
        label: "Map",
        input: formatMapName(targetSetupProp.map),
      },
      {
        label: "Player action",
        input: formatActionName(targetSetupProp.action),
      },
      {
        label: "Requires White Flute?",
        input: targetSetupProp.requiresWhiteFlute ? "Yes" : "No",
        show: targetSetupProp.action === "RockSmash",
      },
      {
        label: "Pokéblock",
        input:
          targetSetupProp.safariPokeblock !== null ? (
            <Wild3PokeblockDescription
              pokeblock={targetSetupProp.safariPokeblock}
            />
          ) : null,
        show: targetSetupProp.safariPokeblock !== null,
      },
      {
        label: "Lead",
        input: formatLeadName(targetSetupProp.lead),
      },
      ...buildGen3CalibPreviousStepFields({
        targetSetup: targetSetupProp,
        battleVideoInfo: battleVideoInfoProp,
        initialAdv,
      }),
      {
        label: "Lead Cycle Speed",
        input: leadCycleSpeedToText(leadCycleSpeedProp),
        show:
          targetSetupProp.lead !== "Egg" && overwriteLeadCycleSpeed === null,
      },
      {
        label: "Target Pokémon",
        input: targetSetupResult,
      },
    ];

    return (
      <Flex vertical>
        <h3>Info from previous steps</h3>
        <Flex ml={20} vertical>
          <FormFieldTable fields={fields} />
          {clearAll != null && (
            <Button
              trackerId="wild3Calib_clearAll"
              danger
              maxWidth={150}
              size="small"
              onClick={clearAll}
            >
              Clear All
            </Button>
          )}
        </Flex>
      </Flex>
    );
  };

  const inputForms = () => {
    return (
      <>
        {targetSetupInputForm()}
        {battleVideoInfoInputForm()}
      </>
    );
  };

  const usingBattleVideo =
    (battleVideoInfo?.battleVideoAdvAfterPainting ?? 0) > 0;

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null ? inputForms() : infoFromPrevSteps()}

      {canDoCalib && targetSetup != null && targetSetupHasEncounter && (
        <>
          {displayInstructions &&
            (usingBattleVideo ? (
              <Instructions_calib_with_battle_video />
            ) : (
              <Instructions_calib_without_battle_video />
            ))}
          <FormFieldTable fields={calibFields} />
          <MultiTimer
            milliseconds={milliseconds}
            labels={labels}
            startButtonTrackerId="start_wild3_calib_timer"
            stopButtonTrackerId="stop_wild3_calib_timer"
          />
          <Wild3CalibCaughtMon
            targetSetup={targetSetup}
            setLatestHitAdv={setLatestHitAdv}
            leadCycleSpeed={finalLeadCycleSpeed}
          />
          {hasHitTargetAdv && targetSetup != null && (
            <>
              <Instructions_calib_wrong_method />
              <Wild3LeadCycleSpeedSelector
                targetSetup={targetSetup}
                permitEnablingDebugOptions
                setLeadCycleSpeed={setOverwriteLeadCycleSpeed}
                leadCycleSpeed={finalLeadCycleSpeed}
              />
            </>
          )}
        </>
      )}
    </Flex>
  );
};
