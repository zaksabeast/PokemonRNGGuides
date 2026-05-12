import React from "react";
import {
  Flex,
  MultiTimer,
  Field,
  Select,
  Button,
  NumberInput,
} from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import {
  TargetSetup,
  Wild3CalibTargetSetupInput,
} from "./wild3CalibTargetSetupInput";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon.component";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import {
  formatLargeInteger,
  formatLargeIntegerWithSign,
} from "~/utils/formatLargeInteger";
import { formatActionName, formatLeadName, formatMapName } from "./utils";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { AllOrNone } from "~/types";
import { BattleVideoInfoInput } from "./wild3CalibBattleVideoInfoInput";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { formatHex } from "~/utils/formatHex";
import { Gen3Method } from "~/rngTools";

import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import Instructions_calib_with_battle_video from "./instructions_calib_with_battle_video.mdx";
import Instructions_calib_without_battle_video from "./instructions_calib_without_battle_video.mdx";
import Instructions_calib_wrong_method from "./instructions_calib_wrong_method.mdx";
import {
  Wild3MethodDistribution,
  type Props as Wild3MethodDistributionProps,
} from "./wild3MethodDistribution";
import { Wild3Action } from "../../../../rng_tools/pkg/rng_tools";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./leadCycleSpeedSelector";

type CalibOffset = {
  offset: number; // between pressing A and reaching SweetScent function.
  calibNoBattleVideo: number; // non-vblank advances between booting and triggering SweetScent. exact number depends on map encounter table and dynamic actors.
  calibBattleVideo: number; // non-vblank advances between watching battle video and triggering SweetScent.
};

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
    calibBattleVideo: 4,
  },
  SweetScentWater: {
    offset: 354,
    calibNoBattleVideo: 10,
    calibBattleVideo: 4,
  },
  RockSmash: {
    // assuming interacting with the rock from the overworld
    offset: 301,
    calibNoBattleVideo: 10,
    calibBattleVideo: 4,
  },
} as const satisfies Record<Wild3Action, CalibOffset>;

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
  clearAll?: () => void;
  displayInstructions?: boolean;
}>;

const targetSetupToMethodDistributionFixedData = (
  targetSetup: TargetSetup | null,
): Wild3MethodDistributionProps["fixedData"] => {
  if (targetSetup == null) {
    return null;
  }

  return {
    map: targetSetup.map,
    action: targetSetup.action,
    advance: targetSetup.targetPaintingAdvs.after,
    tid: 0,
    sid: 0,
    lead: targetSetup.lead,
    roamerState: targetSetup.roamerState,
    feebasState: targetSetup.feebasState,
    massOutbreakState: targetSetup.massOutbreakState,
    initial_seed: targetSetup.targetPaintingAdvs.before,
    painting_advs:
      targetSetup.targetPaintingAdvs.before === 0
        ? null
        : {
            frame_before_painting: targetSetup.targetPaintingAdvs.before,
            adv_after_painting: targetSetup.targetPaintingAdvs.after,
          },
    wantedMethod: targetSetup.targetMethod,
    wantedPID: null,
    idealLeadCycleSpeed: null,
    usingIdealLeadCycleSpeed: false,
  };
};

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
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

  React.useEffect(() => {
    if (targetSetup == null) {
      setTargetSetupHasEncounter(false);
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup).then(
      ({ content, hasEncounter }) => {
        setTargetSetupResult(content);
        setTargetSetupHasEncounter(hasEncounter);
      },
    );
  }, [targetSetup]);

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
    setHasHitTargetAdv(false);
  }, [targetSetup]);

  const targetSetupInputForm = () => (
    <Flex vertical gap={10}>
      {displayInstructions && <Instructions_calib_skip_setup />}
      <Wild3CalibTargetSetupInput setTargetSetup={setTargetSetup} />
      {targetSetupResult != null && (
        <FormFieldTable
          fields={[
            {
              label: "Target Pokémon",
              input: targetSetupResult,
            },
          ]}
        />
      )}
    </Flex>
  );

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

  const consoleProp = battleVideoInfoProp?.consoleType;
  const calibFields: Field[] = [
    // consoleType has 3 possible sources:
    //  - battleVideoInfoProp.consoleType
    //  - battleVideoInfoInput (if battleVideoInfoProp == null)
    //  - here if (battleVideoInfoProp != null but battleVideoInfoProp.consoleType is null)

    // Don't show Console field if battleVideoInfoProp == null because it's already shown in battleVideoInfoInput
    {
      label: "Console",
      show: battleVideoInfoProp != null,
      input:
        battleVideoInfoProp != null &&
        battleVideoInfoProp.consoleType == null ? (
          <Select<Gen3Console>
            name="console"
            value={consoleTypeFromInput}
            options={gen3ConsoleOptions}
            onSelect={(val) => {
              setConsoleTypeFromInput(val);
            }}
          />
        ) : (
          (gen3ConsoleOptions.find((opt) => opt.value === consoleProp)?.label ??
          "")
        ),
    },
    {
      label: "Calibration",
      input: calibration + " advances",
      tooltip: "Number of RNG advances not caused by frames. (Ex: NPC moving)",
    },
    {
      label: "Offset",
      input: offset + " advances",
      tooltip:
        "Number of RNG advances between the last player input and when the Pokémon generation occurs.",
    },
    {
      label: "Human Input Delay (advance)",
      tooltip:
        "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
      input: (
        <NumberInput
          numType="decimal"
          onChange={setHumanInputDelay}
          value={humanInputDelay}
        />
      ),
    },
  ];

  const canDoCalib =
    battleVideoInfo != null || targetSetup?.targetPaintingAdvs.before === 0;

  const infoFromPrevSteps = () => {
    if (targetSetupProp == null) {
      return null;
    }

    const usingPaintingReseeding =
      battleVideoInfoProp.targetPaintingAdvs.before > 0;

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
        label: "Lead",
        input: formatLeadName(targetSetupProp.lead),
      },
      {
        label: "Lead Cycle Speed",
        input:
          targetSetupProp.leadCycleSpeed === AVERAGE_LEAD_CYCLE_SPEED
            ? "Average"
            : targetSetupProp.leadCycleSpeed,
        show: targetSetupProp.lead !== "Egg",
      },
      {
        label: "Target Method",
        input: targetSetupProp.targetMethod,
      },
      {
        label: "Target frame before painting",
        input: `${formatLargeInteger(battleVideoInfoProp.targetPaintingAdvs.before)} (Seed: ${formatHex(battleVideoInfoProp.targetPaintingAdvs.before, 2)})`,
        show: usingPaintingReseeding,
      },
      {
        label: "Battle Video advance",
        input: formatLargeInteger(
          battleVideoInfoProp.battleVideoAdvAfterPainting,
        ),
        show: battleVideoInfoProp.battleVideoAdvAfterPainting > 0,
      },
      {
        label: "Target advance",
        input:
          formatLargeInteger(targetSetupProp.targetPaintingAdvs.after) +
          (initialAdv > 0
            ? ` (${formatLargeIntegerWithSign(targetSetupProp.targetPaintingAdvs.after - initialAdv)} from Battle Video)`
            : ``),
        show: !usingPaintingReseeding,
      },
      {
        label: "Target advance after painting",
        input: `${formatLargeInteger(targetSetupProp.targetPaintingAdvs.after)} (${formatLargeIntegerWithSign(targetSetupProp.targetPaintingAdvs.after - initialAdv)} from Battle Video)`,
        show: usingPaintingReseeding,
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

  const methodDistributionFixedData =
    targetSetupToMethodDistributionFixedData(targetSetup);

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null ? inputForms() : infoFromPrevSteps()}

      {canDoCalib && targetSetup != null && targetSetupHasEncounter && (
        <>
          <FormFieldTable fields={calibFields} />
          {displayInstructions &&
            (usingBattleVideo ? (
              <Instructions_calib_with_battle_video />
            ) : (
              <Instructions_calib_without_battle_video />
            ))}
          <MultiTimer
            milliseconds={milliseconds}
            labels={labels}
            startButtonTrackerId="start_wild3_calib_timer"
            stopButtonTrackerId="stop_wild3_calib_timer"
          />
          <Wild3CalibCaughtMon
            targetSetup={targetSetup}
            setLatestHitAdv={setLatestHitAdv}
          />
          {hasHitTargetAdv && (
            <>
              <Instructions_calib_wrong_method />
              <Wild3MethodDistribution
                fixedData={methodDistributionFixedData}
                permitEnablingDebugOptions
              />
            </>
          )}
        </>
      )}
    </Flex>
  );
};
