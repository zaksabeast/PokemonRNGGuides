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
import createEmotionServer from "@emotion/server/create-instance";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";
import { themePalette, getTheme } from "~/theme/index";
import { getGuide } from "~/guides";
import { HelmetProvider, HelmetDataContext } from "@dr.pogodin/react-helmet";
// @ts-expect-error -- react-dom/server is a commonjs module for some reason.  react-dom/server.browser doesn't have proper types, but works as expected.
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
  const lightAntdStyles = extractStyle((node) => (
    <ConfigProvider theme={getTheme(themePalette.light)}>{node}</ConfigProvider>
  ));

  const darkAntdStyles = extractStyle((node) => (
    <ConfigProvider theme={getTheme(themePalette.dark)}>{node}</ConfigProvider>
  ));

  return {
    light: `${resetStyles}${lightAntdStyles}`,
    dark: `${resetStyles}${darkAntdStyles}`,
  };
};

const antdStyles = renderAntdStyles();

type RenderResult = {
  html: string;
  emotionStyles: string;
  metaTags: string;
  lang: string;
  antdStyles: {
    light: string;
    dark: string;
  };
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

  const { css: emotionStyles } =
    createEmotionServer(emotionCache).extractCritical(html);

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
    emotionStyles,
    metaTags,
    antdStyles,
    lang: guide.meta.translation?.language ?? "en",
  };
};
