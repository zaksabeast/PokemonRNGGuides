import {
  Flex,
  FormFieldTable,
  NumberInput,
  Select,
  Switch,
} from "~/components";
import { Gen3Console, gen3ConsoleOptions } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { useState } from "react";
import { Typography } from "antd";

export type Props = {
  targetPaintingAdvs: { before: number; after: number };
  setBattleVideoInfo: (info: BattleVideoInfo | null) => void;
};

export const BattleVideoInfoInput = ({
  targetPaintingAdvs,
  setBattleVideoInfo,
}: Props) => {
  const usingPaintingReseeding = targetPaintingAdvs.before > 0;
  const [usingBattleVideoWithoutPainting, setUsingBattleVideoWithoutPainting] =
    useState(false);
  const [existingBattleVideoAdv, setExistingBattleVideoAdv] = useState(0);
  const [consoleType, setConsoleType] = useState<Gen3Console>("GBA");

  const onChange = (
    existingBattleVideoAdv: number,
    consoleType: Gen3Console,
  ) => {
    const usingBattleVideo =
      usingPaintingReseeding || usingBattleVideoWithoutPainting;

    if (usingBattleVideo && existingBattleVideoAdv === 0) {
      return setBattleVideoInfo(null);
    }

    setBattleVideoInfo({
      targetPaintingAdvs,
      battleVideoAdvAfterPainting: usingBattleVideo
        ? existingBattleVideoAdv
        : 0,
      consoleType,
    });
  };

  return (
    <FormFieldTable
      fields={[
        {
          label: "Using Battle Video?",
          input: (
            <Switch
              onChange={(val) => {
                setUsingBattleVideoWithoutPainting(val);
                onChange(existingBattleVideoAdv, consoleType);
              }}
            />
          ),
          show: !usingPaintingReseeding,
        },
        {
          label: "Battle Video advance",
          input: (
            <Flex vertical>
              <NumberInput
                numType="decimal"
                value={existingBattleVideoAdv}
                onChange={(val) => {
                  setExistingBattleVideoAdv(val ?? 0);
                  onChange(val ?? 0, consoleType);
                }}
              />
              {usingPaintingReseeding && existingBattleVideoAdv === 0 && (
                <Typography.Text type="danger">
                  Using Painting Reseeding requires using a Battle Video with
                  advance above 0.
                </Typography.Text>
              )}
            </Flex>
          ),
          show: usingPaintingReseeding || usingBattleVideoWithoutPainting,
          indent: usingPaintingReseeding ? 0 : 1,
        },
        {
          label: "Console",
          input: (
            <Select<Gen3Console>
              value={consoleType}
              options={gen3ConsoleOptions}
              onSelect={(val) => {
                setConsoleType(val);
                onChange(existingBattleVideoAdv, val);
              }}
            />
          ),
        },
      ]}
    />
  );
};
