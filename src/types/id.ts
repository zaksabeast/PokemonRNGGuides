import { IdFilter as RngToolsIdFilter } from "~/rngTools";
import { match } from "ts-pattern";
import { z } from "zod";
import { HexSchema } from "~/utils/number";

const NoFilterSchema = z.object({
  type: z.literal("none"),
  value0: z.null(),
  value1: z.null(),
});

const TidFilterSchema = z.object({
  type: z.literal("tid"),
  value0: HexSchema(0xffff),
  value1: z.null(),
});

const SidFilterSchema = z.object({
  type: z.literal("sid"),
  value0: HexSchema(0xffff),
  value1: z.null(),
});

const PidFilterSchema = z.object({
  type: z.literal("pid"),
  value0: HexSchema(0xffffffff),
  value1: z.null(),
});

const TsvFilterSchema = z.object({
  type: z.literal("tsv"),
  value0: z.number().int().min(0).max(9999),
  value1: z.null(),
});

const TidSidFilterSchema = z.object({
  type: z.literal("tidsid"),
  value0: HexSchema(0xffff),
  value1: HexSchema(0xffff),
});

const TidPidFilterSchema = z.object({
  type: z.literal("tidpid"),
  value0: HexSchema(0xffff),
  value1: HexSchema(0xffffffff),
});

export type IdFilter =
  | {
      type: "none";
      value0: null;
      value1: null;
    }
  | {
      type: "tid";
      value0: number;
      value1: null;
    }
  | {
      type: "sid";
      value0: number;
      value1: null;
    }
  | {
      type: "pid";
      value0: number;
      value1: null;
    }
  | {
      type: "tsv";
      value0: number;
      value1: null;
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

export const IdFilterSchema: z.Schema<IdFilter> = z.discriminatedUnion("type", [
  NoFilterSchema,
  TidFilterSchema,
  SidFilterSchema,
  PidFilterSchema,
  TsvFilterSchema,
  TidSidFilterSchema,
  TidPidFilterSchema,
]);

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
