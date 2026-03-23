import React from "react";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";
import { Select } from "./select";
import { NumberInput } from "./numberInput";
import clamp from "lodash-es/clamp";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { match } from "ts-pattern";

type FormikEmeraldTargetAdvanceProps<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, number>;
};

type Mode = "Advance" | "Seed";

const opts = [
  { label: "Advance", value: "Advance" as Mode },
  { label: "Seed (hex)", value: "Seed" as Mode },
];

export const FormikEmeraldTargetAdvance = <FormState extends GenericForm>({
  name,
}: FormikEmeraldTargetAdvanceProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<number | null>(name);

  const [mode, setMode] = React.useState<Mode>("Advance");
  const [seed, setSeed] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value === null) {
      return;
    }

    const adv_clamped = clamp(value, 0, 0xffffffff);
    if (value !== adv_clamped) {
      setValue(adv_clamped);
      return;
    }

    const seed = pokerng_with_jump(0, adv_clamped);
    setSeed(seed);
  }, [setValue, value]);

  React.useEffect(() => {
    if (seed === null) {
      return;
    }
    const seed_clamped = clamp(seed, 0, 0xffffffff);
    if (seed !== seed_clamped) {
      setSeed(seed_clamped);
      return;
    }
    const adv = lcrng_distance(0, seed_clamped);
    setValue(adv);
  }, [seed, setValue]);

  return (
    <>
      <Select options={opts} value={mode} onChange={setMode} />
      {match(mode)
        .with("Advance", () => (
          <NumberInput value={value} numType="decimal" onChange={setValue} />
        ))
        .with("Seed", () => (
          <>
            <NumberInput value={seed} numType="hex" onChange={setSeed} />
            {value != null && `Advance: ${value}`}
          </>
        ))
        .exhaustive()}
    </>
  );
};
