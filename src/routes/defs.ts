import { z } from "zod";
import { guideSlugs } from "~/__generated__/guides";

const routeDefs = guideSlugs;

export const RouteSchema = z.union(routeDefs);

export const routes = routeDefs.map((route) => route.value);

export type Route = z.infer<typeof RouteSchema>;
