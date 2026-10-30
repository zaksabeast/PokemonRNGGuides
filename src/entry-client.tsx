import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "~/app";
import { settings } from "~/settings";
import { initAmplitude } from "~/analytics";
import { registerSW } from "virtual:pwa-register";
import { dispatchNeedRefresh } from "~/swRefresh/event";
import { Router } from "wouter";
import {
  createCache as createAntdCache,
  StyleProvider as AntdCacheProvider,
} from "@ant-design/cssinjs";
import createEmotionCache from "@emotion/cache";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { MetaTags } from "./components";
import { RouteSchema } from "~/routes/defs";

const updateSw = registerSW({
  onNeedRefresh: dispatchNeedRefresh,
});

if (!settings.isDev) {
  initAmplitude(settings.amplitudeApiKey, {
    appVersion: settings.gitCommit,
    autocapture: {
      attribution: true,
      elementInteractions: false,
      fileDownloads: false,
      formInteractions: false,
      pageViews: false,
      sessions: true,
    },
  });
}

const antdCache = createAntdCache();
const emotionCache = createEmotionCache({ key: "css" });

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Let's assume this exists or else the entire app is broken
const rootElement = document.getElementById("root")!;

const app = (
  <HelmetProvider>
    <EmotionCacheProvider value={emotionCache}>
      <AntdCacheProvider cache={antdCache} hashPriority="low">
        <Router>
          <MetaTags />
          <App updateSw={updateSw} />
        </Router>
      </AntdCacheProvider>
    </EmotionCacheProvider>
  </HelmetProvider>
);

const { pathname } = window.location;
const renderedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

// Only guide routes are prerendered, but hosts can serve other HTML for a path:
// the unrendered 404.html template for a missing page, or a fallback page
// for unknown routes. Only hydrate when the HTML matches a guide route.
const hasRenderedHtml = rootElement.childElementCount > 0;
const isGuideRoute = RouteSchema.safeParse(renderedPath).success;

if (hasRenderedHtml && isGuideRoute) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
