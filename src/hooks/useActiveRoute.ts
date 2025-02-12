import React from "react";
import { useLocation, matchRoute, useRouter } from "wouter";
import { Route, routes, RouteSchema } from "~/routes/defs";

type SetActiveRoute = (route: Route) => void;

export const useActiveRoute = (): [Route, SetActiveRoute] => {
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

  return React.useMemo(() => [route, setLocation], [route, setLocation]);
};
