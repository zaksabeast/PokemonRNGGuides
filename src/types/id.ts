import { IdFilter as RngToolsIdFilter } from "~/rngTools";
import {
  DecimalString,
  fromDecimalString,
  fromHexString,
  HexString,
} from "~/utils/number";
import { match } from "ts-pattern";

export type IdFilter =
  | {
      type: "none";
      value0: "";
      value1: "";
    }
  | {
      type: "tid";
      value0: DecimalString;
      value1: "";
    }
  | {
      type: "sid";
      value0: DecimalString;
      value1: "";
    }
  | {
      type: "pid";
      value0: HexString;
      value1: "";
    }
  | {
      type: "tsv";
      value0: DecimalString;
      value1: "";
    }
  | {
      type: "tidsid";
      value0: DecimalString;
      value1: DecimalString;
    }
  | {
      type: "tidpid";
      value0: DecimalString;
      value1: HexString;
    };

export const denormalizeIdFilter = (
  value: IdFilter,
): RngToolsIdFilter | null => {
  return match<IdFilter, RngToolsIdFilter | null>(value)
    .with({ type: "none" }, () => null)
    .with({ type: "tid" }, ({ value0 }) => ({
      Tid: fromDecimalString(value0) ?? 0,
    }))
    .with({ type: "sid" }, ({ value0 }) => ({
      Sid: fromDecimalString(value0) ?? 0,
    }))
    .with({ type: "pid" }, ({ value0 }) => ({
      Pid: fromHexString(value0) ?? 0,
    }))
    .with({ type: "tsv" }, ({ value0 }) => ({
      Tsv: fromDecimalString(value0) ?? 0,
    }))
    .with({ type: "tidsid" }, ({ value0, value1 }) => ({
      TidSid: {
        tid: fromDecimalString(value0) ?? 0,
        sid: fromDecimalString(value1) ?? 0,
      },
    }))
    .with({ type: "tidpid" }, ({ value0, value1 }) => ({
      TidPid: {
        tid: fromDecimalString(value0) ?? 0,
        pid: fromHexString(value1) ?? 0,
      },
    }))
    .exhaustive();
};

export const denormalizeIdFilterOrDefault = (
  value: IdFilter,
): RngToolsIdFilter => {
  return (
    denormalizeIdFilter(value) ?? {
      Tid: 0,
    }
  );
};
