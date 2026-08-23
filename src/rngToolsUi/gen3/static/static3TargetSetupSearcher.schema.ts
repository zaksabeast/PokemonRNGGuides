import z from "zod";
import { gen3StaticMethods } from "./constants";
import { targetSetupSearcherSchema } from "../pokemonRng/targetSetupSearcher";

export const static3TargetSetupSearcherSchema = z
  .object({
    methods: z.array(z.enum(gen3StaticMethods)).min(1),
    roaming: z.boolean(),
  })
  .extend(targetSetupSearcherSchema.shape);
