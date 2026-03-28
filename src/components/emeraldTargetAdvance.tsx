import React from "react";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";
import { Select } from "./select";
import { NumberInput } from "./numberInput";
import clamp from "lodash-es/clamp";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { match } from "ts-pattern";
import { Flex } from "./flex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { RadioGroup } from "./radio";
import { RadioChangeEvent } from "antd";
import { formatHex } from "~/utils/formatHex";

type FormikEmeraldTargetAdvanceProps<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, number>;
};

type Mode = "Advance" | "Seed";

const opts = [
  { label: "Advance", value: "Advance" satisfies Mode },
  { label: "Seed (hex)", value: "Seed" satisfies Mode },
];

const handleAdvance = (value: number | null) => {
  // Sync: Advance → Seed
  if (value === null) {
    return null;
  }

  const adv_clamped = clamp(value, 0, 0xffffffff);
  if (value !== adv_clamped) {
    return adv_clamped;
  }

  return pokerng_with_jump(0, adv_clamped);
};

const handleSeed = (seed: number | null) => {
  // Sync: Seed → Advance
  if (seed === null) {
    return null;
  }

  const seed_clamped = clamp(seed, 0, 0xffffffff);
  if (seed !== seed_clamped) {
    return seed_clamped;
  }

  return lcrng_distance(0, seed_clamped);
};

export const FormikEmeraldTargetAdvance = <FormState extends GenericForm>({
  name,
}: FormikEmeraldTargetAdvanceProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<number | null>(name);

  const [mode, setMode] = React.useState<Mode>("Advance");
  const [seed, setSeed] = React.useState<number | null>(null);

  React.useEffect(() => {
    match(mode)
      .with("Advance", () => setSeed(handleAdvance(value)))
      .with("Seed", () => setValue(handleSeed(seed)))
      .exhaustive();
  }, [mode, value, seed, setValue]);

  const onChange = React.useCallback(
    (evt: RadioChangeEvent) => {
      setMode(evt.target.value as Mode);
    },
    [setMode],
  );

  return (
    <Flex vertical gap={4}>
      <RadioGroup
        options={opts}
        value={mode}
        onChange={onChange}
        optionType="button"
      />
      {match(mode)
        .with("Advance", () => (
          <>
            <NumberInput value={value} numType="decimal" onChange={setValue} />
            {seed != null && `Seed: ${formatHex(seed)}`}
          </>
        ))
        .with("Seed", () => (
          <>
            <NumberInput value={seed} numType="hex" onChange={setSeed} />
            {value != null && `Advance: ${formatLargeInteger(value)}`}
          </>
        ))
        .exhaustive()}
    </Flex>
  );
};
