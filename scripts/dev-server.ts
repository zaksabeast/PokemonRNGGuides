/* eslint-disable no-console */

import fs from "node:fs/promises";
import http from "node:http";
import { toNativeAbsolute } from "./path";
import type * as _EntryServer from "../src/entry-server";

type EntryServer = typeof _EntryServer;

const port = process.env.PORT || 5173;

const server = http.createServer();

const { createServer } = await import("vite");
const vite = await createServer({
  server: { middlewareMode: true, hmr: { server } },
  appType: "custom",
});

// Runs for every request Vite's own middlewares don't handle
vite.middlewares.use(async (req, res) => {
  try {
    const url = req.url ?? "/";
    const render: EntryServer["render"] = (
      await vite.ssrLoadModule("src/entry-server.jsx")
    ).render;

    let template = await fs.readFile(
      toNativeAbsolute("../index.html"),
      "utf-8",
    );
    template = await vite.transformIndexHtml(url, template);

    const renderUrl = url.endsWith("/") ? url : `${url}/`;
    const rendered = await render(renderUrl);
    const result = template
      .replace("<!--injected-meta-tags-->", rendered.metaTags)
      .replace(
        `<!--injected-styles-->`,
        `<style>${rendered.antdStyles}</style>`,
      )
      .replace(`<!--app-html-->`, rendered.html)
      .replace('<html lang="en">', `<html lang="${rendered.lang}">`);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(result);
  } catch (err) {
    if (err instanceof Error) {
      vite.ssrFixStacktrace(err);
    }
    const message = err instanceof Error ? err.stack : String(err);
    console.log(message);
    res.statusCode = 500;
    res.end(message);
  }
});

// Vite already rejects unknown Host headers (DNS rebinding), but still
// serves requests that other sites make to localhost
const isCrossOriginRequest = (req: http.IncomingMessage) => {
  const { origin, host } = req.headers;
  if (origin != null && URL.parse(origin)?.host !== host) {
    return true;
  }

  // Covers no-cors requests like <script> and <img>, which don't send Origin.
  // Navigations from other sites are allowed so links to the dev server work.
  const fetchSite = req.headers["sec-fetch-site"];
  const isNavigation = req.headers["sec-fetch-mode"] === "navigate";
  return (
    (fetchSite === "cross-site" || fetchSite === "same-site") && !isNavigation
  );
};

// Start http server
server.on("request", (req, res) => {
  if (isCrossOriginRequest(req)) {
    res.statusCode = 403;
    res.end("Cross-origin requests are not allowed");
    return;
  }
  vite.middlewares(req, res);
});
server.on("error", (err) => {
  console.error(`Failed to start server on port ${port}: ${err.message}`);
  process.exit(1);
});
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
