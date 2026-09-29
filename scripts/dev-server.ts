/* eslint-disable no-console */

import fs from "node:fs/promises";
import express from "express";
import { toNativeAbsolute } from "./path";
import type * as _EntryServer from "../src/entry-server";
import type * as _RouteDefs from "../src/routes/defs";

type EntryServer = typeof _EntryServer;
type RouteDefs = typeof _RouteDefs;

const port = process.env.PORT || 5173;

const app = express();

const { createServer } = await import("vite");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
app.use(vite.middlewares);

app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl;
    const render: EntryServer["render"] = (
      await vite.ssrLoadModule("src/entry-server.jsx")
    ).render;

    let template = await fs.readFile(
      toNativeAbsolute("../index.html"),
      "utf-8",
    );
    template = await vite.transformIndexHtml(url, template);

    const { pathname } = new URL(url, "http://localhost");
    const renderUrl = pathname.endsWith("/") ? pathname : `${pathname}/`;

    // Unknown routes (e.g. backwards compatible redirects) get the unrendered
    // template, matching the 404.html fallback used in production.
    const { RouteSchema }: RouteDefs = await vite.ssrLoadModule(
      "src/routes/defs.ts",
    );
    if (!RouteSchema.safeParse(renderUrl).success) {
      res.status(200).set({ "Content-Type": "text/html" }).send(template);
      return;
    }

    const rendered = await render(renderUrl);
    const result = template
      .replace("<!--injected-meta-tags-->", rendered.metaTags)
      .replace(
        `<!--injected-styles-->`,
        `<style>${rendered.antdStyles}</style>`,
      )
      .replace(`<!--app-html-->`, rendered.html)
      .replace('<html lang="en">', `<html lang="${rendered.lang}">`);

    res.status(200).set({ "Content-Type": "text/html" }).send(result);
  } catch (err) {
    vite?.ssrFixStacktrace(err);
    console.log(err.stack);
    res.status(500).end(err.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
