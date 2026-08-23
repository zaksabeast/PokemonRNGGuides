export type NumberInputType = "hex" | "hex_bigint" | "decimal" | "float";
export type NumericNumberInputType = Exclude<NumberInputType, "hex_bigint">;
type NumberInputValue = number | bigint | null;

const decimalSeparatorsRegex = /[,:']/g;

const normalizeDecimal = (str: string) =>
  str.trim().replace(decimalSeparatorsRegex, "");

const parseCompleteDecimal = (str: string) => {
  const normalized = normalizeDecimal(str);

  if (!/^-?\d+$/.test(normalized)) {
    return Number.NaN;
  }

  return Number.parseInt(normalized, 10);
};

const parseCompleteHex = (str: string) => {
  const normalized = str.trim().replace(/^0x/i, "");

  if (!/^[\da-f]+$/i.test(normalized)) {
    return Number.NaN;
  }

  return Number.parseInt(normalized, 16);
};

export const parseHexBigInt = (str: string) => {
  const normalized = str.trim().replace(/^0x/i, "");

  try {
    return BigInt(`0x${normalized}`);
  } catch {
    return Number.NaN;
  }
};

export const parseCompleteFloat = (str: string) => {
  const normalized = str.trim();

  if (!/^-?(?:(?:\d+\.\d+)|\d+|\.\d+)$/.test(normalized)) {
    return Number.NaN;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const parseFloatOnBlur = (str: string) => {
  const normalized = str.trim();

  if (!/^-?(?:(?:\d+\.\d*)|\d+|\.\d+)$/.test(normalized)) {
    return Number.NaN;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const isPotentialFloat = (str: string) =>
  /^-?(?:\d+)?(?:\.\d*)?$/.test(str);

export const supportsNegative = (numType: NumberInputType) =>
  numType === "decimal" || numType === "float";

export const isTransientValue = (numType: NumberInputType, value: string) => {
  if (supportsNegative(numType) && value === "-") {
    return true;
  }

  return numType === "float" && Number.isNaN(parseCompleteFloat(value));
};

export const deserializers = {
  hex: (str: string) => parseCompleteHex(str),
  hex_bigint: (str: string) => parseHexBigInt(str),
  decimal: (str: string) => parseCompleteDecimal(str),
  float: (str: string) => parseCompleteFloat(str),
} satisfies Record<NumberInputType, (str: string) => number | bigint>;

const isValidNumberInputValue = (value: number | bigint) =>
  typeof value === "bigint" || !Number.isNaN(value);

export type NumberInputChangeResult =
  | { accepted: false }
  | {
      accepted: true;
      transientValue: string | null;
      nextValue: NumberInputValue | undefined;
    };

export const getNumberInputChangeResult = (
  numType: NumberInputType,
  inputValue: string,
): NumberInputChangeResult => {
  const normalizedInputValue = inputValue.trim();

  if (numType === "float" && !isPotentialFloat(normalizedInputValue)) {
    return { accepted: false };
  }

  if (normalizedInputValue.length === 0) {
    return {
      accepted: true,
      transientValue: "",
      nextValue: null,
    };
  }

  if (isTransientValue(numType, normalizedInputValue)) {
    return {
      accepted: true,
      transientValue: normalizedInputValue,
      nextValue:
        supportsNegative(numType) && normalizedInputValue === "-"
          ? null
          : undefined,
    };
  }

  const deserialized = deserializers[numType](normalizedInputValue);

  if (!isValidNumberInputValue(deserialized)) {
    return { accepted: false };
  }

  return {
    accepted: true,
    transientValue: null,
    nextValue: deserialized,
  };
};

export const getNumberInputBlurValue = (
  numType: NumberInputType,
  transientValue: string,
): NumberInputValue | undefined => {
  const deserialized =
    numType === "float"
      ? parseFloatOnBlur(transientValue)
      : deserializers[numType](transientValue);

  return isValidNumberInputValue(deserialized) ? deserialized : undefined;
};

export const shouldClearTransientValue = ({
  numType,
  transientValue,
  previousExternalValue,
  externalValue,
}: {
  numType: NumberInputType;
  transientValue: string | null;
  previousExternalValue: number | bigint | null | undefined;
  externalValue: number | bigint | null | undefined;
}) => {
  if (transientValue == null || externalValue === previousExternalValue) {
    return false;
  }

  if (
    supportsNegative(numType) &&
    transientValue === "-" &&
    externalValue == null
  ) {
    return false;
  }

  return true;
};

export const serializers = {
  hex: (num: number | bigint | null) => num?.toString(16),
  hex_bigint: (num: number | bigint | null) => num?.toString(16),
  decimal: (num: number | bigint | null) => num?.toString(10),
  float: (num: number | bigint | null) => num?.toString(10),
};
