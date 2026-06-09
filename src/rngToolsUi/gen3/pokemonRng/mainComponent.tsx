import { atomWithPersistence } from "~/state/localStorage";
import { gen3Consoles } from "~/types/console";
import z from "zod";

export const aceSidSchema = z
          .number()
          .int()
          .min(0)
          .max(0xffff)
          .optional()
          .nullable()
          .default(null);

export const targetPaintingAdvsSchema = z.object({
          before: z.number().int().min(0).max(0xffffffff),
          after: z.number().int().min(0).max(0xffffffff),
        });

export const createBattleVideoInfoAtom = (atomName:string) => {
return atomWithPersistence(
  atomName,
  z.object({
    battleVideoInfo: z
      .object({
        targetPaintingAdvs: targetPaintingAdvsSchema,
        battleVideoAdvAfterPainting: z.number().int().min(0),
        consoleType: z.enum(gen3Consoles).nullable(),
      })
      .nullable(),
  }),
  {
    battleVideoInfo: null,
  },
);

};