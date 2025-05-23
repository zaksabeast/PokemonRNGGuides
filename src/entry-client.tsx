import { hydrateRoot } from "react-dom/client";
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

hydrateRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Let's assume this exists or else the entire app is broken
  document.getElementById("root")!,
  <HelmetProvider>
    <EmotionCacheProvider value={emotionCache}>
      <AntdCacheProvider cache={antdCache} hashPriority="low">
        <Router>
          <MetaTags />
          <App updateSw={updateSw} />
        </Router>
      </AntdCacheProvider>
    </EmotionCacheProvider>
  </HelmetProvider>,
);
