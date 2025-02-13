import {
  Router as WRouter,
  Route as WRoute,
  Switch,
  DefaultParams,
  RouteProps,
  Redirect,
} from "wouter";
import { type Route, routes } from "./defs";
import { GuideScreen } from "~/screens/guide";
import { NotFoundScreen } from "~/screens/notFound";
import { useTrackPageNotFound } from "~/hooks/useTrackPageNotFound";

// These routes used to exist before the site rewrite. Redirect them to the home page.
const backwardsCompatibleRoutes = [
  "tools-and-emulators",
  "transporter",
  "ruby-and-sapphire",
  "gamecube",
  "fire-red-and-leaf-green",
  "emerald",
  "diamond-pearl-and-platinum",
  "heart-gold-and-soul-silver",
  "black-and-white",
  "black-2-and-white-2",
  "x-and-y",
  "omega-ruby-and-alpha-sapphire",
  "sun-and-moon",
  "ultra-sun-and-ultra-moon",
  "sword-and-shield",
  "brilliant-diamond-and-shining-pearl",
  "legends-arceus",
];

const BackwardsCompatiblePage = () => {
  useTrackPageNotFound();
  return <Redirect to="/" />;
};

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

        {backwardsCompatibleRoutes.map((route) => (
          <WRoute key={route} path={route}>
            <BackwardsCompatiblePage />
          </WRoute>
        ))}

        <NavRoute component={NotFoundScreen} />
      </Switch>
    </WRouter>
  );
};
