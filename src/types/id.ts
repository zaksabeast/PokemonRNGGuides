import { IdFilter as RngToolsIdFilter } from "~/rngTools";
import { match } from "ts-pattern";

export type IdFilter =
  | {
      type: "none";
      value0: undefined;
      value1: undefined;
    }
  | {
      type: "tid";
      value0: number;
      value1: undefined;
    }
  | {
      type: "sid";
      value0: number;
      value1: undefined;
    }
  | {
      type: "pid";
      value0: number;
      value1: undefined;
    }
  | {
      type: "tsv";
      value0: number;
      value1: undefined;
    }
  | {
      type: "tidsid";
      value0: number;
      value1: number;
    }
  | {
      type: "tidpid";
      value0: number;
      value1: number;
    };

export const denormalizeIdFilter = (
  value: IdFilter,
): RngToolsIdFilter | null => {
  return match<IdFilter, RngToolsIdFilter | null>(value)
    .with({ type: "none" }, () => null)
    .with({ type: "tid" }, ({ value0 }) => ({
      Tid: value0,
    }))
    .with({ type: "sid" }, ({ value0 }) => ({
      Sid: value0,
    }))
    .with({ type: "pid" }, ({ value0 }) => ({
      Pid: value0,
    }))
    .with({ type: "tsv" }, ({ value0 }) => ({
      Tsv: value0,
    }))
    .with({ type: "tidsid" }, ({ value0, value1 }) => ({
      TidSid: {
        tid: value0,
        sid: value1,
      },
    }))
    .with({ type: "tidpid" }, ({ value0, value1 }) => ({
      TidPid: {
        tid: value0,
        pid: value1,
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
