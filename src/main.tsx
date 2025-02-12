import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as AntdApp, ConfigProvider } from "antd";
import { App } from "~/app";
import { settings } from "~/settings";
import { initAmplitude } from "~/analytics";
import { ThemeProvider } from "@emotion/react";
import { antdTheme } from "~/theme";
import { MDXProvider } from "@mdx-js/react";
import { markdownComponents } from "~/components/markdown";
import { MetaTags } from "~/components";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

if (!settings.isDev) {
  initAmplitude(settings.amplitudeApiKey, {
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={antdTheme}>
      <ConfigProvider theme={antdTheme}>
        <AntdApp>
          <MDXProvider components={markdownComponents}>
            <MetaTags />
            <App />
          </MDXProvider>
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  </StrictMode>,
);
