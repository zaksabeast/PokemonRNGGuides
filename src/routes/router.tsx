import { Route as WRoute, RouteProps, Switch, Redirect } from "wouter";
import { type Route, routes } from "./defs";
import { NotFoundScreen } from "~/screens/notFound";
import { useTrackPageNotFound } from "~/hooks/useTrackPageNotFound";
import { MarkdownScreen } from "~/screens/markdownScreen";

export const NavRoute: React.FC<RouteProps<never, Route>> = WRoute;

// These routes used to exist before the site rewrite. Redirect them to the home page.
const backwardsCompatibleRoutes = ["tools-and-emulators", "transporter"];

const BackwardsCompatiblePage = () => {
  useTrackPageNotFound();
  return <Redirect to="/" />;
};

export const Router = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <NavRoute key={route} path={route} component={MarkdownScreen} />
      ))}

      {backwardsCompatibleRoutes.map((route) => (
        <WRoute key={route} path={route}>
          <BackwardsCompatiblePage />
        </WRoute>
      ))}

      <NavRoute component={NotFoundScreen} />
    </Switch>
  );
};
