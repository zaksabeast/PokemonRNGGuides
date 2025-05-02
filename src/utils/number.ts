import { z } from "zod";
import { isNumber } from "lodash-es";

export const HexSchema = (max: number) =>
  z
    .number()
    .int()
    .min(0)
    .max(max, `Must be less than or equal to ${max.toString(16)}`);

export const ZodSerializedOptional = <Schema extends z.ZodTypeAny>(
  schema: Schema,
) =>
  z
    .union([schema, z.null(), z.literal("")])
    .transform((arg): z.infer<Schema> | null => {
      if (arg === "") {
        return null;
      }

      return arg;
    });

export const ZodSerializedDecimal = z
  .union([z.number(), z.string()])
  .transform((arg) => (isNumber(arg) ? arg : parseFloat(arg)))
  .refine((num) => !isNaN(num));

export const ZodSerializedHex = z
  .union([z.number(), z.string()])
  .transform((arg) => (isNumber(arg) ? arg : parseInt(arg, 16)))
  .refine((num) => !isNaN(num));

export const ZodDecimalString = z
  .string()
  .refine((str) => {
    return !isNaN(parseFloat(str));
  }, "DecimalString")
  .brand("DecimalString");

export const ZodHexString = z
  .string()
  .refine((str) => {
    return !isNaN(parseInt(str, 16));
  }, "HexString")
  .brand("HexString");

export type DecimalString = z.infer<typeof ZodDecimalString>;
export type HexString = z.infer<typeof ZodHexString>;

export const capPrecision = (value: number): number => {
  return parseFloat(value.toFixed(3));
};

export const toDecimalString = (num: number): DecimalString =>
  num.toString() as DecimalString;

export const toHexString = (num: number): HexString =>
  num.toString(16) as HexString;

export const fromDecimalString = (str: DecimalString): number | null => {
  const num = capPrecision(parseFloat(str));
  return isNaN(num) ? null : num;
};

export const fromHexString = (str: HexString): number | null => {
  const num = parseInt(str, 16);
  return isNaN(num) ? null : num;
};
