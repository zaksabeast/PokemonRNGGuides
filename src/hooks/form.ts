import { RadioChangeEvent, InputProps as AntdInputProps } from "antd";
import {
  useController,
  useFormContext as useRHFormContext,
} from "react-hook-form";
import { match, P } from "ts-pattern";
import { GenericForm } from "~/types";
import * as tst from "ts-toolbelt";

export type FieldStatus = tst.U.NonNullable<AntdInputProps["status"]>;

export const useField = <Value>(
  name: string,
): [
  {
    value: Value;
    onBlur: () => void;
    onChange: (event: React.ChangeEvent | RadioChangeEvent) => void;
  },
  { error?: string | undefined; status?: FieldStatus },
  { setValue: (value: Value) => void },
] => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = match(fieldError?.message)
    .with(P.union(P.string, undefined), (msg) => msg)
    .otherwise((msg) => JSON.stringify(msg));

  return [
    { value, onBlur, onChange },
    { error, status: error != null ? "error" : undefined },
    { setValue: onChange },
  ];
};

export const useFormContext = <FormState extends GenericForm>() => {
  const { setValue, reset } = useRHFormContext<FormState>();

  return {
    setFieldValue: setValue,
    reset,
  };
};
