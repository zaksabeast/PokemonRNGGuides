import { z } from "zod";

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
