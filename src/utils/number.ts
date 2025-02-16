export type DecimalString = string & { readonly _tag: "DecimalString" };
export type HexString = string & { readonly _tag: "HexString" };

export const toDecimalString = (num: number): DecimalString =>
  num.toString() as DecimalString;

export const toHexString = (num: number): HexString =>
  num.toString(16) as HexString;

export const fromDecimalString = (str: DecimalString): number | null => {
  const num = parseInt(str);
  return isNaN(num) ? null : num;
};

export const fromHexString = (str: HexString): number | null => {
  const num = parseInt(str, 16);
  return isNaN(num) ? null : num;
};
