import { Gen3PkmFilter, Gen3PidSpeedFilter, Species } from "~/rngTools";
import { z } from "zod";

export type Gen3PkmFilterFields = {
  filter_max_size: boolean;
  filter_pid_speed: Gen3PidSpeedFilter;
  filter_min_lvl: number | null;
  filter_max_lvl: number | null;
};

export const gen3PkmFilterSchema = z.object({
  filter_max_size: z.boolean(),
  filter_pid_speed: z.object({
    active: z.boolean(),
    min_cycle_count: z.number().int().min(18).max(900),
    max_cycle_count: z.number().int().min(18).max(900),
  }),
  filter_min_lvl: z.number().int().min(1).max(100).nullable(),
  filter_max_lvl: z.number().int().min(1).max(100).nullable(),
});

export const gen3PkmFilterFieldsToRustInput = (
  fields: Gen3PkmFilterFields,
  species: Species | null,
): Gen3PkmFilter => {
  return {
    max_size: fields.filter_max_size,
    pid_speed: fields.filter_pid_speed,
    min_lvl: fields.filter_min_lvl,
    max_lvl: fields.filter_max_lvl,
    species,
  };
};

export const getGen3PkmFilterInitialValues = (): Gen3PkmFilterFields => ({
  filter_max_size: false,
  filter_pid_speed: {
    active: false,
    min_cycle_count: 18,
    max_cycle_count: 900,
  },
  filter_min_lvl: null,
  filter_max_lvl: null,
});
