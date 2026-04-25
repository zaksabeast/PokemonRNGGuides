import { FormFieldTable, NumberInput, Select, Switch } from "~/components";
import { Gen3Console, gen3ConsoleOptions } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import { useState } from "react";

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

  const onChange = () => {
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
                onChange();
              }}
            />
          ),
          show: !usingPaintingReseeding,
        },
        {
          label: usingPaintingReseeding
            ? "Advances between painting and existing Battle Video"
            : "Battle Video advance",
          input: (
            <NumberInput
              numType="decimal"
              value={existingBattleVideoAdv}
              onChange={(val) => {
                setExistingBattleVideoAdv(val ?? 0);
                onChange();
              }}
            />
          ),
          show: usingPaintingReseeding || usingBattleVideoWithoutPainting,
          indent: usingPaintingReseeding ? 0 : 1,
        },
        {
          label: "Console",
          input: (
            <Select<Gen3Console>
              name="console"
              value={consoleType}
              options={gen3ConsoleOptions}
              onSelect={(val) => {
                setConsoleType(val);
                onChange();
              }}
            />
          ),
        },
      ]}
    />
  );
};
