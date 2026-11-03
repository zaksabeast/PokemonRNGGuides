import z from "zod";
import {
  gen3LeadSchema,
  wild3Actions,
  wild3FeebasStates,
  wild3MassOutbreakStates,
  wild3RoamerStates,
} from "./utils";
import { gen3Methods } from "~/types";
import { pokeblockSchema } from "~/types/pokeblock";
import { wild3AudioInfluencesSchema } from "./wild3AudioInfluences";

export const targetSetupAtomSchema = z.object({
  targetSetup: z
    .object({
      map: z.string(),
      feebasState: z.enum(wild3FeebasStates),
      feebasCycles: z.number().int().min(0).max(0xffffffff).default(0),
      feebasVblankSelection: z
        .union([
          z.literal("MostProbable"),
          z.object({ Exact: z.number().int().min(0).max(0xffffffff) }),
        ])
        .optional()
        .default("MostProbable"),
      roamerState: z.enum(wild3RoamerStates),
      massOutbreakState: z.enum(wild3MassOutbreakStates),
      action: z.enum(wild3Actions),
      lead: gen3LeadSchema,
      targetPaintingAdvs: z.object({
        before: z.number().int().min(0).max(0xffffffff),
        after: z.number().int().min(0).max(0xffffffff),
      }),
      targetMethod: z.enum(gen3Methods),
      requiresWhiteFlute: z.boolean().optional().default(false),
      safariPokeblock: pokeblockSchema.optional().default(null),
      aceSid: z
        .number()
        .int()
        .min(0)
        .max(0xffff)
        .optional()
        .nullable()
        .default(null),
    })
    .and(wild3AudioInfluencesSchema)
    .nullable(),
});
