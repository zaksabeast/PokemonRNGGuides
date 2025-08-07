import { RadioChangeEvent } from "antd";
import {
  useController,
  useFormContext as useRHFormContext,
} from "react-hook-form";
import { match, P } from "ts-pattern";
import { GenericForm } from "~/types";

export const useField = <Value>(
  name: string,
): [
  {
    value: Value;
    onBlur: () => void;
    onChange: (event: React.ChangeEvent | RadioChangeEvent) => void;
  },
  { error?: string | undefined; touched?: boolean },
  { setValue: (value: Value) => void },
] => {
  const { control } = useRHFormContext();
  const {
    field: { value, onBlur, onChange },
    formState,
  } = useController({
    control,
    name,
  });

  const error = match(formState.errors[name]?.message)
    .with(P.union(P.string, undefined), (error) => error)
    .otherwise(() => "Unknown error");

  const touched = formState.touchedFields[name];

  return [
    { value, onBlur, onChange },
    { error, touched },
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
