import { z } from "zod";
import { RouteSchema } from "~/routes/defs";

export const SlugOrExternalLinkSchema = z.union([
  z.object({
    type: z.literal("slug"),
    slug: RouteSchema,
  }),
  z.object({
    type: z.literal("externalLink"),
    externalLink: z.string(),
  }),
]);

export type SlugOrExternalLink = z.infer<typeof SlugOrExternalLinkSchema>;
