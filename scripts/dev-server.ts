/* eslint-disable no-console */

import fs from "node:fs/promises";
import express from "express";
import { toNativeAbsolute } from "./path";
import type * as _EntryServer from "../src/entry-server";

type EntryServer = typeof _EntryServer;

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

    const renderUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    const rendered = await render(renderUrl);
    const result = template
      .replace("<!--injected-meta-tags-->", rendered.metaTags)
      .replace(
        `<!--injected-styles-->`,
        `<style data-emotion>${rendered.emotionStyles}</style>
        <style>${rendered.antdStyles.all}</style>`,
      )
      .replace(`<!--app-html-->`, rendered.html);

    res.status(200).set({ "Content-Type": "text/html" }).send(result);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
