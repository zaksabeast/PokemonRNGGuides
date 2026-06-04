import { RadioChangeEvent, InputProps as AntdInputProps } from "antd";
import {
  useController,
  useFormContext as useRHFormContext,
  useWatch as useRHWatch,
} from "react-hook-form";
import { match, P } from "ts-pattern";
import { GenericForm } from "~/types";
import * as tst from "ts-toolbelt";
import { z } from "zod";
import { zipObject } from "lodash-es";
import { NullableSchema } from "~/utils/nullableSchema";

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

export const useWatch = <
  Shape extends z.core.$ZodLooseShape,
  Names extends Partial<Record<keyof Shape, true>>,
>({
  names,
  validationSchema,
}: {
  names: Names;
  validationSchema: z.ZodObject<Shape>;
}) => {
  const nameKeys = Object.keys(names);
  const raw = useRHWatch({ name: nameKeys });
  const values = zipObject(nameKeys, raw);
  const Schema = NullableSchema(validationSchema.pick(names)).partial();
  const parsed = Schema.safeParse(values);

  if (parsed.success) {
    return parsed.data;
  }

  // Returning an empty object makes the return type `{}`, no matter what `parsed.data` is.
  // Typing `empty` provides the correct return type in this branch.
  const empty: Partial<z.infer<typeof Schema>> = {};
  return empty;
};
