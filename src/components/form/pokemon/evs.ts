import { z } from "zod";
import { Ivs } from "~/rngTools";

const EvSchema = z.number().int().min(0).max(255);

export const EvsSchema: z.Schema<Record<keyof Ivs, number>> = z.object({
  hp: EvSchema,
  atk: EvSchema,
  def: EvSchema,
  spa: EvSchema,
  spd: EvSchema,
  spe: EvSchema,
});

export type Evs = z.infer<typeof EvsSchema>;
