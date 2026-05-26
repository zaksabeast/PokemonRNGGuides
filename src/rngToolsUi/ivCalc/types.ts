import { z } from "zod";
import { type IvRanges, LevelStat } from "~/rngTools";
import { nature, species, StatFieldsSchema } from "~/types";
import { characteristics } from "../gen4/gen4types";

export const Validator = z
  .object({
    gen: z.enum(["3", "4", "5"]),
    species: z.enum(species),
    nature: z.enum(nature),
    characteristic: z.enum(["None", ...characteristics]),
    level: z.number().min(1).max(100),
  })
  .extend(StatFieldsSchema.shape);

export type FormState = z.infer<typeof Validator>;

export type IvRangeColumn = {
  stat: string;
  nextLevel: number | string;
  value: string;
};

export type IvRangeResult = {
  hasSubmitted: boolean;
  errorMessage: string | null;
  data: {
    ivRanges: IvRanges;
    submittedLevelStats: LevelStat;
  }[];
};
