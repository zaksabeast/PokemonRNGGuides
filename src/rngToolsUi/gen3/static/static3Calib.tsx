import React from "react";
import { Flex, Button } from "~/components";
import { FormCard, FormSection, FormSummary } from "~/components/form";
import { EmbeddedRunTimer } from "~/rngToolsUi/timer/embeddedRunTimer";
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
import { Gen3CalibFields } from "../pokemonRng/calib";
import { getGen3CalibPreviousStepRows } from "../pokemonRng/labels";
import { Static3TargetSetupInput } from "./static3TargetSetupInput";
import Instructions_calib_skip_setup from "./instructions_calib_skip_setup.mdx";
import { getEmeraldStaticCalibData } from "./constants.tsx";

const getCalibData = (targetSetup: TargetSetup | null) => {
  if (targetSetup !== null) {
    const data = getEmeraldStaticCalibData(
      targetSetup.species,
      targetSetup.roaming,
    );
    if (data !== null) {
      return data;
    }
  }
  return {
    offset: 0,
    calib: 0,
    instructions: null,
  };
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
        <FormCard>
          <FormSummary
            rows={[{ label: "Target Pokémon", value: targetSetupResult }]}
          />
        </FormCard>
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

  const { offset, calib, instructions } = getCalibData(targetSetup);

  const advFromTimer =
    targetForTimer - initialAdv - (humanInputDelay ?? 0) - offset - calib;

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

  const canDoCalib =
    battleVideoInfo != null || targetSetup?.targetPaintingAdvs.before === 0;

  const infoFromPrevSteps = () => {
    if (targetSetupProp == null) {
      return null;
    }

    return (
      <FormCard>
        <FormSection title="Info from previous steps">
          <FormSummary
            rows={[
              ...getGen3CalibPreviousStepRows({
                targetSetup: targetSetupProp,
                battleVideoInfo: battleVideoInfoProp,
                initialAdv,
              }),
              { label: "Target Pokémon", value: targetSetupResult },
            ]}
          />
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
        </FormSection>
      </FormCard>
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

          {displayInstructions && instructions}

          <Gen3CalibFields
            battleVideoInfoProp={battleVideoInfoProp}
            consoleTypeFromInput={consoleTypeFromInput}
            setConsoleTypeFromInput={setConsoleTypeFromInput}
            calibration={calib}
            offset={offset}
            humanInputDelay={humanInputDelay}
            setHumanInputDelay={setHumanInputDelay}
          />
          <EmbeddedRunTimer
            milliseconds={milliseconds}
            labels={labels}
            startTrackerId="start_static3_calib_timer"
            stopTrackerId="stop_static3_calib_timer"
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
