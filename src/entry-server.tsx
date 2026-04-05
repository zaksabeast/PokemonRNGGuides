import { MetaTags } from "~/components";
import { App } from "~/app";
import { Router } from "wouter";
import { noop } from "lodash-es";
import { RouteSchema } from "~/routes/defs";
import {
  createCache as createAntdCache,
  StyleProvider as AntdCacheProvider,
} from "@ant-design/cssinjs";
import createEmotionCache from "@emotion/cache";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";
import { getTheme } from "~/theme/index";
import { getGuide } from "~/guides";
import { HelmetProvider, HelmetDataContext } from "@dr.pogodin/react-helmet";
import { renderToReadableStream as _renderToReadableStream } from "react-dom/server.browser";

// Type hack to get the correct type for renderToReadableStream
import type { renderToReadableStream as TrenderToReadableStream } from "react-dom/server";
const renderToReadableStream: typeof TrenderToReadableStream =
  _renderToReadableStream;

export const renderToStringAsync = async (element: React.ReactNode) => {
  const stream = await renderToReadableStream(element);
  const reader = stream.getReader();
  let html = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    html += decoder.decode(value, { stream: true });
  }

  return html;
};

const renderAntdStyles = () => {
  const resetStyles = `
      html,
      body {
        padding: 0;
        margin: 0;
        -webkit-tap-highlight-color: transparent;
      }

      button,
      .ant-btn {
        /* Adjust selector to target the affected buttons */
        -webkit-tap-highlight-color: transparent;
      }`;
  const antdStyles = extractStyle((node) => (
    <ConfigProvider theme={getTheme()}>{node}</ConfigProvider>
  ));

  return `${resetStyles}${antdStyles}`;
};

const antdStyles = renderAntdStyles();

type RenderResult = {
  html: string;
  metaTags: string;
  lang: string;
  antdStyles: string;
};

export const render = async (url: string): Promise<RenderResult> => {
  const route = RouteSchema.parse(url.length === 0 ? "/" : url);

  const antdCache = createAntdCache();
  const emotionCache = createEmotionCache({ key: "css" });
  const guide = getGuide(route);
  const helmetContext: HelmetDataContext = {};

  const html = await renderToStringAsync(
    <HelmetProvider context={helmetContext}>
      <EmotionCacheProvider value={emotionCache}>
        <AntdCacheProvider cache={antdCache} hashPriority="low">
          <Router ssrPath={route}>
            <MetaTags />
            <App updateSw={noop} />
          </Router>
        </AntdCacheProvider>
      </EmotionCacheProvider>
    </HelmetProvider>,
  );

  const { helmet } = helmetContext;
  const metaTags =
    helmet == null
      ? ""
      : [
          helmet.title.toString(),
          helmet.priority.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
        ].join("\n");

  return {
    html,
    metaTags,
    antdStyles,
    lang: guide.meta.translation?.language ?? "en",
  };
};
