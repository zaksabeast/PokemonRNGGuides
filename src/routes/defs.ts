import { z } from "zod";
import { guideSlugs } from "~/__generated__/guides";

export const RouteSchema = z.enum(guideSlugs);

export const routes = guideSlugs;

export type Route = z.infer<typeof RouteSchema>;
