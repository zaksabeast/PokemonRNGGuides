import { Route as WRoute, Switch, Redirect } from "wouter";
import { NavRoute } from ".";
import { routes } from "./defs";
import { NotFoundScreen } from "~/screens/notFound";
import { useTrackPageNotFound } from "~/hooks/useTrackPageNotFound";
import { MarkdownScreen } from "~/screens/markdownScreen";

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
