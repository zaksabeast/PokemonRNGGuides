import React from "react";
import clamp from "lodash-es/clamp";
import { match } from "ts-pattern";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { type InfoTooltipContent } from "~/components/form/base/infoTooltip";
import { NumberField } from "~/components/form/base/numberField";
import {
  RadioField,
  type RadioOption,
} from "~/components/form/base/radioField";

type Mode = "Advance" | "Seed";

const modeOptions: RadioOption<Mode>[] = [
  { label: "Advance", value: "Advance" },
  { label: "Seed (hex)", value: "Seed" },
];

const MAX_U32 = 0xffffffff;

const advanceToSeed = (advance: number | null) => {
  if (advance === null) {
    return null;
  }

  const clamped = clamp(advance, 0, MAX_U32);
  if (advance !== clamped) {
    return clamped;
  }

  return pokerng_with_jump(0, clamped);
};

const seedToAdvance = (seed: number | null) => {
  if (seed === null) {
    return null;
  }

  const clamped = clamp(seed, 0, MAX_U32);
  if (seed !== clamped) {
    return clamped;
  }

  return lcrng_distance(0, clamped);
};

type Props<FormState extends GenericForm> = {
  name: Paths<FormState, number | null>;
  label: React.ReactNode;
  tooltip?: InfoTooltipContent;
};

export const TargetAdvanceField = <FormState extends GenericForm>({
  name,
  label,
  tooltip,
}: Props<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<number | null>(
    name,
  );

  const [mode, setMode] = React.useState<Mode>("Advance");
  const [seed, setSeed] = React.useState<number | null>(null);

  React.useEffect(() => {
    match(mode)
      .with("Advance", () => setSeed(advanceToSeed(value)))
      .with("Seed", () => setValue(seedToAdvance(seed)))
      .exhaustive();
  }, [mode, value, seed, setValue]);

  return (
    <>
      <RadioField<Mode>
        label={label}
        tooltip={tooltip}
        cellSize="word"
        value={mode}
        options={modeOptions}
        onChange={setMode}
      />
      {match(mode)
        .with("Advance", () => (
          <NumberField
            name={name}
            label="Advance"
            numType="decimal"
            value={value}
            onBlur={onBlur}
            onChange={setValue}
            errorMessage={error}
            helperText={seed != null ? `Seed: ${formatHex(seed)}` : undefined}
          />
        ))
        .with("Seed", () => (
          <NumberField
            name={name}
            label="Seed"
            numType="hex"
            value={seed}
            onBlur={onBlur}
            onChange={setSeed}
            errorMessage={error}
            helperText={
              value != null
                ? `Advance: ${formatLargeInteger(value)}`
                : undefined
            }
          />
        ))
        .exhaustive()}
    </>
  );
};
