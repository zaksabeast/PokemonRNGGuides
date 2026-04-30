import React from "react";
import { Flex, MultiTimer, Field, Input, Select, Button } from "~/components";
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
import {
  CycleAtMoment,
  Gen3Method,
  rngTools,
  Wild3GeneratorOptions,
} from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { lcrng_distance } from "~/utils/lcrng";

import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import Instructions_calib_with_battle_video from "./instructions_calib_with_battle_video.mdx";
import Instructions_calib_without_battle_video from "./instructions_calib_without_battle_video.mdx";
import Instructions_calib_wrong_method from "./instructions_calib_wrong_method.mdx";
import { emeraldWildGameData } from "./wild3CalibCaughtMon";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./leadCycleSpeedSelector";
import { Wild3CycleAtMoments } from "./wild3CycleAtMoments";

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
  clearAll?: () => void;
  displayInstructions?: boolean;
}>;

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
  battleVideoInfo: battleVideoInfoProp,
  clearAll,
  displayInstructions = true,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    targetSetupProp ?? null,
  );

  React.useEffect(() => {
    setTargetSetup(targetSetupProp ?? null);
  }, [targetSetupProp]);

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (targetSetup == null) {
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup).then(setTargetSetupResult);
  }, [targetSetup]);

  const [battleVideoInfo, setBattleVideoInfo] =
    React.useState<BattleVideoInfo | null>(battleVideoInfoProp ?? null);

  React.useEffect(() => {
    setBattleVideoInfo(battleVideoInfoProp ?? null);
  }, [battleVideoInfoProp]);

  const [consoleTypeFromInput, setConsoleTypeFromInput] =
    React.useState<Gen3Console>("GBA");
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);
  const [hasHitTargetAdv, setHasHitTargetAdv] = React.useState(false);
  const [cycleAtMoments, setCycleAtMoments] = React.useState<CycleAtMoment[]>(
    [],
  );

  React.useEffect(() => {
    setHasHitTargetAdv(false);
    setCycleAtMoments([]);
  }, [targetSetup]);

  React.useEffect(() => {
    if (!hasHitTargetAdv || targetSetup == null) {
      setCycleAtMoments([]);
      return;
    }

    let active = true;

    const leadCycleSpeed =
      targetSetup.lead === "Egg"
        ? 0
        : targetSetup.usingAverageLeadCycleSpeed
          ? AVERAGE_LEAD_CYCLE_SPEED
          : targetSetup.leadCycleSpeed;

    const opts: Wild3GeneratorOptions = {
      tid: 0,
      sid: 0,
      map_idx: 0,
      action: targetSetup.action,
      methods: [targetSetup.targetMethod],
      lead: targetSetup.lead,
      filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
      gen3_filter: gen3PkmFilterFieldsToRustInput(
        getGen3PkmFilterInitialValues(),
        null,
      ),
      consider_cycles: true,
      consider_rng_manipulated_lead_pid: true,
      generate_even_if_impossible: true,
      roamer_state: targetSetup.roamerState,
      mass_outbreak_state: targetSetup.massOutbreakState,
      feebas_state: targetSetup.feebasState,
      lead_cycle_speed: leadCycleSpeed,
    };

    const mapData = emeraldWildGameData.maps_data.find(
      (table) => table.map_id === targetSetup.map,
    );
    if (mapData == null) {
      setCycleAtMoments([]);
      return;
    }

    rngTools
      .generate_gen3_wild_distribution(
        targetSetup.targetPaintingAdvs.before,
        targetSetup.targetPaintingAdvs.after,
        opts,
        mapData,
      )
      .then(({ cycle_at_moments }) => {
        if (active) {
          setCycleAtMoments(cycle_at_moments);
        }
      });

    return () => {
      active = false;
    };
  }, [hasHitTargetAdv, targetSetup]);

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
      hitMethod === targetSetup?.targetMethod
    ) {
      setHasHitTargetAdv(true);
    }

    setCalibrationAndOffset(
      calibrationAndOffset + hitAdv.adv_after_painting - targetForTimer,
    );
  };

  const targetForTimer = targetSetup?.targetPaintingAdvs.after ?? 0;

  const initialAdv = battleVideoInfo?.battleVideoAdvAfterPainting ?? 0;

  const advFromTimer = targetForTimer - initialAdv - calibrationAndOffset;

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
    if (targetSetup == null) {
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
      label: "Calibration + Offset (advance)",
      input: (
        <Input
          name="offset"
          onChange={(event) => {
            const num = Number(event.target.value);
            setCalibrationAndOffset(Number.isFinite(num) ? num : 0);
          }}
          value={calibrationAndOffset}
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
        label: "Lead",
        input: formatLeadName(targetSetupProp.lead),
      },
      {
        label: "Lead Cycle Speed",
        input: targetSetupProp.usingAverageLeadCycleSpeed
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

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null ? inputForms() : infoFromPrevSteps()}

      {canDoCalib && targetSetup != null && (
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
              <Wild3CycleAtMoments
                leadCycleSpeed={
                  targetSetup.lead === "Egg"
                    ? null
                    : targetSetup.usingAverageLeadCycleSpeed
                      ? AVERAGE_LEAD_CYCLE_SPEED
                      : targetSetup.leadCycleSpeed
                }
                cycleAtMomentsFromTool={cycleAtMoments}
                advanceAtSweetScent={
                  lcrng_distance(0, targetSetup.targetPaintingAdvs.before) +
                  targetSetup.targetPaintingAdvs.after
                }
              />
            </>
          )}
        </>
      )}
    </Flex>
  );
};
