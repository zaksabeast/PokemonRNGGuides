import {
  FormCard,
  FormSection,
  NumberField,
  SelectField,
  SwitchField,
} from "~/components/form";
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

  const battleVideoAdvanceField = (
    <NumberField
      label="Battle Video advance"
      numType="decimal"
      value={existingBattleVideoAdv}
      onChange={(val) => {
        setExistingBattleVideoAdv(val ?? 0);
        onChange(val ?? 0, consoleType);
      }}
      errorMessage={
        usingPaintingReseeding && existingBattleVideoAdv === 0
          ? "Using Painting Reseeding requires using a Battle Video with advance above 0."
          : undefined
      }
    />
  );

  return (
    <FormCard>
      <FormSection>
        {usingPaintingReseeding ? (
          battleVideoAdvanceField
        ) : (
          <SwitchField
            label="Using Battle Video?"
            value={usingBattleVideoWithoutPainting}
            onChange={(val) => {
              setUsingBattleVideoWithoutPainting(val);
              onChange(existingBattleVideoAdv, consoleType);
            }}
          >
            {battleVideoAdvanceField}
          </SwitchField>
        )}
        <SelectField<Gen3Console>
          label="Console"
          value={consoleType}
          options={gen3ConsoleOptions}
          onChange={(val) => {
            setConsoleType(val);
            onChange(existingBattleVideoAdv, val);
          }}
        />
      </FormSection>
    </FormCard>
  );
};
