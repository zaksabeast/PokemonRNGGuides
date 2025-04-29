import { Router as WRouter, Route as WRoute, Switch, Redirect } from "wouter";
import { NavRoute } from ".";
import { routes } from "./defs";
import { GuideScreen } from "~/screens/guide";
import { NotFoundScreen } from "~/screens/notFound";
import { useTrackPageNotFound } from "~/hooks/useTrackPageNotFound";
import { ChallengeScreen } from "~/screens/challenge";

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

export const Router = () => {
  return (
    <WRouter>
      <Switch>
        {routes.map((route) =>
          route.startsWith("/challenge") ? (
            <NavRoute key={route} path={route} component={ChallengeScreen} />
          ) : (
            <NavRoute key={route} path={route} component={GuideScreen} />
          ),
        )}

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
