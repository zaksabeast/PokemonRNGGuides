import { RadioChangeEvent, InputProps as AntdInputProps } from "antd";
import {
  useController,
  useFormContext as useRHFormContext,
} from "react-hook-form";
import { get } from "lodash-es";
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
    formState,
  } = useController({
    name,
  });

  const errorMessage = get(formState.errors, `${name}.message`);
  const error = match({ errorMessage })
    .with(
      { errorMessage: P.union(P.string, undefined) },
      ({ errorMessage }) => errorMessage,
    )
    .otherwise(() => JSON.stringify(errorMessage));

  return [
    { value, onBlur, onChange },
    { error, status: error != null ? "error" : undefined },
    { setValue: onChange },
  ];
};

export const useFormContext = <FormState extends GenericForm>() => {
  const {
    formState: { isSubmitting },
    setValue,
    reset,
  } = useRHFormContext<FormState>();

  return {
    isSubmitting,
    setFieldValue: setValue,
    reset,
  };
};
