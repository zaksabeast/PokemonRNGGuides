// We really do want useLocation here, since everything else uses useActiveRoute,
// but useActiveRoute cannot use itself.
// eslint-disable-next-line no-restricted-imports
import { useLocation, matchRoute, useRouter } from "wouter";
import { Route, routes, RouteSchema } from "~/routes/defs";
import { guides } from "~/guides";
import { getTranslations } from "~/translations";

export const useActiveRoute = (): Route => {
  const { parser } = useRouter();
  const [location, setLocation] = useLocation();
  const [, matchedRoute] = routes
    .map((route): [boolean, string] => [
      matchRoute(parser, route, location)[0],
      route,
    ])
    .find(([match]) => match) ?? [false, "/"];
  const parsed = RouteSchema.safeParse(matchedRoute);
  const route: Route = parsed.success ? parsed.data : "/";

  if (!parsed.success) {
    setLocation("/");
  }

  return route;
};

export const useActiveRouteTranslations = () => {
  const route = useActiveRoute();
  const language = guides[route].meta?.translation?.language ?? "en";
  return getTranslations(language);
};
