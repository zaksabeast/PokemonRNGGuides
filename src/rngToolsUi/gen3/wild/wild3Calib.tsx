import React, { useState } from "react";
import { Flex, MultiTimer, Field, Input, Select, NumberInput } from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetSetup as TargetSetup, Wild3CalibTarget } from "./wild3CalibTarget";
import { Wild3CalibCaughtMon } from "./wild3CalibCaughtMon";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import { BattleVideoInfo } from "../paintingReseeding/paintingReseeding";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

type Props = {
  targetSetup?: TargetSetup;
  battleVideoInfo?: BattleVideoInfo;
};

export const Wild3Calib = ({
  targetSetup: targetSetupProp,
  battleVideoInfo: battleVideoInfoProp,
}: Props) => {
  const [targetSetup, setTargetSetup] = React.useState<TargetSetup | null>(
    targetSetupProp ?? null,
  );

  const [consoleType, setConsoleType] = useState<Gen3Console>(battleVideoInfoProp?.consoleType ?? "GBA");

  /** calibration is always for target advance after painting.
      calibration is not used if the painting seed is not confirmed */
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(0);

  const calibrationIsActive =
    targetSetup !== null &&
    battleVideoInfoProp == null &&
    (!targetSetup.usingPaintingReseeding ||
      targetSetup.isPaintingSeedConfirmed);

  const setLatestHitAdv = calibrationIsActive
    ? (hitAdv: {
      frame_before_painting: number;
      adv_after_painting: number;
    }) => {
      setCalibrationAndOffset(
        calibrationAndOffset + hitAdv.adv_after_painting - targetForTimer,
      );
    }
    : undefined;

  const targetForTimer = targetSetup?.targetAdvance ?? 0;

  const initialAdvFromProp = battleVideoInfoProp?.battleVideoAdvAfterPainting ?? targetSetup?.existingBattleVideoAdv ?? 0;
  const [initialAdv, setInitialAdv] = React.useState(initialAdvFromProp);

  const advFromTimer = targetForTimer - initialAdv - calibrationAndOffset;

  const milliseconds = [
    5000,
    Math.round((advFromTimer / gen3ConsoleFpsMap[consoleType]) * 1000),
  ];
  const labels = [
    initialAdv > 0 ? "Close the Battle Video" : "Soft reset START+SELECT+A+B",
    "Trigger Sweet Scent",
  ];

  const fields: Field[] =
    targetSetup != null
      ? [
        {
          label: "Battle Video advance",
          input: formatLargeInteger(initialAdv),
          show: !targetSetup.usingPaintingReseeding && initialAdvFromProp > 0,
        },
        {
          label: "Target advance",
          input: formatLargeInteger(targetSetup.targetAdvance) + (initialAdv > 0 ? ` (+${formatLargeInteger(targetSetup.targetAdvance - initialAdv)} from Battle Video)` : ``),
          show: !targetSetup.usingPaintingReseeding,
        },
        {
          label: "Target frame before painting",
          input: formatLargeInteger(targetSetup.targetFrameBeforePainting),
          show: targetSetup.usingPaintingReseeding,
        },
        {
          label: "Battle Video advance",
          input: formatLargeInteger(initialAdv),
          show: targetSetup.usingPaintingReseeding && initialAdvFromProp > 0,
        },
        { // This means battleVideoInfoProp.battleVideoAdvAfterPainting hasn't been set.
          label: "Battle Video advance",
          input: <NumberInput numType="decimal" onChange={(val) => setInitialAdv(val ?? 0)} />,
          show: initialAdvFromProp === 0 && targetSetup.usingPaintingReseeding,
        },
        {
          label: "Target advance after painting",
          input: `${formatLargeInteger(targetSetup.targetAdvance)} (+${formatLargeInteger(targetSetup.targetAdvance - initialAdv)} from Battle Video)`,
          show: targetSetup.usingPaintingReseeding,
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
      ]
      : [];

  fields.push({
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
    show: battleVideoInfoProp?.consoleType == null,
  });

  return (
    <Flex gap={32} vertical>
      {targetSetupProp == null && <Wild3CalibTarget setTargetSetup={setTargetSetup} battleVideoInfo={battleVideoInfoProp} />}

      {targetSetup !== null && (
        <>
          <FormFieldTable fields={fields} />
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
        </>
      )}
    </Flex>
  );
};
