import React from "react";
import { useField } from "~/hooks/form";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { type InfoTooltipContent } from "~/components/form/base/infoTooltip";
import { NumberField } from "~/components/form/base/numberField";
import {
  RadioField,
  type RadioOption,
} from "~/components/form/base/radioField";

type NumType = "decimal" | "hex";

const numTypeOptions: RadioOption<NumType>[] = [
  { label: "Frame", value: "decimal" },
  { label: "Seed (hex)", value: "hex" },
];

type Props<FormState extends GenericForm> = {
  name: Paths<FormState, number | null>;
  label: React.ReactNode;
  tooltip?: InfoTooltipContent;
  onChange?: (value: number | null) => void;
};

export const FrameBeforePaintingField = <FormState extends GenericForm>({
  name,
  label,
  tooltip,
  onChange,
}: Props<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<number | null>(
    name,
  );
  const [numType, setNumType] = React.useState<NumType>("decimal");

  const otherFormat =
    numType === "decimal"
      ? `Seed: ${formatHex(value ?? 0, 2)}`
      : `Frame: ${formatLargeInteger(value ?? 0)}`;

  return (
    <>
      <RadioField<NumType>
        label={label}
        tooltip={tooltip}
        cellSize="word"
        value={numType}
        options={numTypeOptions}
        onChange={setNumType}
      />
      <NumberField
        name={name}
        label={numType === "decimal" ? "Frame" : "Seed"}
        numType={numType}
        value={value}
        onBlur={onBlur}
        onChange={(updatedValue) => {
          setValue(updatedValue);
          onChange?.(updatedValue);
        }}
        errorMessage={error}
        helperText={value != null ? otherFormat : undefined}
      />
    </>
  );
};
