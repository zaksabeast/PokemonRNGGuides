import { GenericForm } from "~/types/form";
import { FormikNumberInputProps, NumberInput } from "./numberInput";
import { useField } from "~/hooks/form";
import React from "react";
import { Flex } from "./flex";
import { RadioGroup } from "./radio";

type NumType = "hex" | "decimal";

type FormikEmeraldFrameBeforePaintingInputProps<FormState extends GenericForm> =
  Omit<FormikNumberInputProps<FormState>, "numType">;

export const FormikEmeraldFrameBeforePaintingInput = <
  FormState extends GenericForm,
>({
  name,
  errorMessage,
  onChange: _onChange,
  ...props
}: FormikEmeraldFrameBeforePaintingInputProps<FormState>) => {
  const [{ value, onBlur }, { error, status }, { setValue }] = useField<
    number | null
  >(name);

  const onChange = (value: number | null) => {
    setValue(value);
    _onChange?.(value);
  };

  const [numType, setNumType] = React.useState<NumType>("decimal");
  const options = [
    { label: "Dec", value: "decimal" } as const,
    { label: "Hex", value: "hex" } as const,
  ];

  return (
    <Flex dir="row" align="center" gap={4}>
      <RadioGroup<NumType>
        value={numType}
        options={options}
        onChange={(val) => {
          setNumType(val.target.value);
        }}
        optionType="button"
      />
      <NumberInput
        status={status}
        {...props}
        numType={numType}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        errorMessage={errorMessage === null ? undefined : error}
      />
    </Flex>
  );
};
