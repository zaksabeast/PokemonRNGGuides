import { Route as WRoute, RouteProps, Switch, Redirect } from "wouter";
import { type Route, routes } from "./defs";
import { NotFoundScreen } from "~/screens/notFound";
import { useTrackPageNotFound } from "~/hooks/useTrackPageNotFound";
import { MarkdownScreen } from "~/screens/markdownScreen";

export const NavRoute: React.FC<RouteProps<never, Route>> = WRoute;

// These routes used to exist before the site rewrite. Redirect them to their new pages.
const backwardsCompatibleRoutes: Record<string, Route | `${Route}?${string}`> =
  {
    "tools-and-emulators": "/",
    "/transporter": "/bank-transporter/",
    "/guides/tools/en/install pcalc.md": "/install-pokereader/?from=pcalc",
    "/downloads/pcalc/usum": "/install-pokereader/?from=pcalc",
  };

const BackwardsCompatiblePage = ({ to }: { to: string }) => {
  useTrackPageNotFound();
  return <Redirect to={to} />;
};

export const Router = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <NavRoute key={route} path={route} component={MarkdownScreen} />
      ))}

      {Object.entries(backwardsCompatibleRoutes).map(([route, to]) => (
        <WRoute key={route} path={route}>
          <BackwardsCompatiblePage to={to} />
        </WRoute>
      ))}

      <NavRoute component={NotFoundScreen} />
    </Switch>
  );
};
