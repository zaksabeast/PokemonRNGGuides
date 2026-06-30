import React from "react";
import { Flex, MultiTimer, Field, Button } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetSetup } from "./static3TargetSetupSearcher";
import { Static3CalibCaughtMon } from "./static3CalibCaughtMon";
import { Gen3Console, gen3ConsoleFpsMap } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { AllOrNone } from "~/types";
import { BattleVideoInfoInput } from "../battleVideo/calibBattleVideoInfoInput";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { Gen3StaticMethod } from "~/rngTools";
import Instructions_calib_with_battle_video from "./instructions_calib_with_battle_video.mdx";
import Instructions_calib_without_battle_video from "./instructions_calib_without_battle_video.mdx";
import {
  buildGen3CalibFields,
  buildGen3CalibPreviousStepFields,
} from "../pokemonRng/calib";
import { Static3TargetSetupInput } from "./static3TargetSetupInput";
import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import Instructions_Castform from "./Instructions_Castform.mdx";

const getCalibData = (targetSetup:TargetSetup | null) => {
    if (targetSetup !== null){
        const data = getEmeraldStaticCalibData(targetSetup.species, targetSetup.roaming);
        if (data !== null){
            return data;
        }
    }
    return {
        offset: 3,
        calibNoBattleVideo: 10,
        calibBattleVideo: 6,
        mustWaitInMenu:false,
    };
};

const getAdditionalInstructions = (species:Species) => {
    return match(species)
        .with("Castform", () => <Instructions_Castform />)
        .otherwise(() => null);
};

type Props = AllOrNone<{
  targetSetup: TargetSetup;
  battleVideoInfo: BattleVideoInfo;
  clearAll?: () => void;
  displayInstructions?: boolean;
}>;

export const Static3Calib = ({
  targetSetup: targetSetupProp,
  battleVideoInfo: battleVideoInfoProp,
  clearAll,
  displayInstructions = true,
}: Props) => {
  const [localTargetSetup, setLocalTargetSetup] =
    React.useState<TargetSetup | null>(null);
  const targetSetup = targetSetupProp ?? localTargetSetup;

  React.useEffect(() => {
    if (targetSetupProp == null) {
      return;
    }

    setLocalTargetSetup(null);
  }, [targetSetupProp]);

  const [targetSetupResult, setTargetSetupResult] =
    React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    if (targetSetup == null) {
      return setTargetSetupResult(null);
    }

    calculateTargetSetupResult(targetSetup).then(({ content }) => {
      setTargetSetupResult(content);
    });
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

  const targetSetupInputForm = () => (
    <Flex vertical gap={10}>
      {displayInstructions && <Instructions_calib_skip_setup />}
      <Static3TargetSetupInput setTargetSetup={setLocalTargetSetup} />
      {targetSetupResult != null && targetSetup != null && (
        <Flex vertical gap={20} mt={20}>
          <FormFieldTable
            fields={[
              {
                label: "Target Pokémon",
                input: targetSetupResult,
              },
            ]}
          />
        </Flex>
      )}
    </Flex>
  );

  const setLatestHitAdv = (
    hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    },
    _hitMethod: Gen3StaticMethod,
  ) => {
    setHumanInputDelay(
      (humanInputDelay ?? 0) + hitAdv.adv_after_painting - targetForTimer,
    );
  };

  const targetForTimer = targetSetup?.targetPaintingAdvs.after ?? 0;

  const initialAdv = battleVideoInfo?.battleVideoAdvAfterPainting ?? 0;

  const { offset, calibBattleVideo, calibNoBattleVideo } = getCalibData(targetSetup);

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
    "Press the final A button",
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

  const calibFields: Field[] = buildGen3CalibFields({
    battleVideoInfoProp,
    consoleTypeFromInput,
    setConsoleTypeFromInput,
    calibration,
    offset,
    humanInputDelay,
    setHumanInputDelay,
  });

  const canDoCalib =
    battleVideoInfo != null || targetSetup?.targetPaintingAdvs.before === 0;

  const infoFromPrevSteps = () => {
    if (targetSetupProp == null) {
      return null;
    }

    const fields: Field[] = [
      ...buildGen3CalibPreviousStepFields({
        targetSetup: targetSetupProp,
        battleVideoInfo: battleVideoInfoProp,
        initialAdv,
      }),
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
              trackerId="static3Calib_clearAll"
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
          {displayInstructions &&
            (usingBattleVideo ? (
              <Instructions_calib_with_battle_video />
            ) : (
              <Instructions_calib_without_battle_video />
            ))}

          {displayInstructions && getAdditionalInstructions(targetSetup.species)}

          <FormFieldTable fields={calibFields} />
          <MultiTimer
            milliseconds={milliseconds}
            labels={labels}
            startButtonTrackerId="start_static3_calib_timer"
            stopButtonTrackerId="stop_static3_calib_timer"
          />
          <Static3CalibCaughtMon
            targetSetup={targetSetup}
            setLatestHitAdv={setLatestHitAdv}
          />
        </>
      )}
    </Flex>
  );
};
