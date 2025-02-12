import {
  Router as WRouter,
  Route as WRoute,
  Switch,
  DefaultParams,
  RouteProps,
} from "wouter";
import { type Route, routes } from "./defs";
import { GuideScreen } from "~/screens/guide";
import { NotFoundScreen } from "~/screens/notFound";

const NavRoute = <
  RoutePath extends "/" | Route,
  T extends DefaultParams | undefined = undefined,
>(
  props: RouteProps<T, RoutePath>,
) => {
  return <WRoute {...props} />;
};

export const Router = () => {
  return (
    <WRouter>
      <Switch>
        {routes.map((route) => (
          <NavRoute key={route} path={route} component={GuideScreen} />
        ))}
        <NavRoute component={NotFoundScreen} />
      </Switch>
    </WRouter>
  );
};
