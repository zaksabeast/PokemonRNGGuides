/* eslint-disable no-console */

import fs from "node:fs";
import { routes } from "../src/routes/defs";
import type * as _EntryServer from "../src/entry-server";
import { toNativeAbsolute } from "./path";
import md5 from "md5";

type EntryServer = typeof _EntryServer;

const template = fs.readFileSync(
  toNativeAbsolute("../dist/index.html"),
  "utf-8",
);
const { render }: EntryServer =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Can't use ts-expect-error, because we won't expect an error if this file hasn't been built.
  // @ts-ignore -- Assume this is compiled before we prerender If not, we'll get an error, the build will fail, and we'll notice before we deploy.
  await import("../dist/server/entry-server.js");

const main = async () => {
  const { antdStyles } = await render("/");
  const cssFileName = `ant-css-${md5(antdStyles).slice(0, 8)}.css`;
  const cssPath = toNativeAbsolute(`../dist/assets/${cssFileName}`);
  fs.writeFileSync(cssPath, antdStyles);

  for (const url of routes) {
    const { html, metaTags, lang } = await render(url);

    const result = template
      .replace("<!--injected-meta-tags-->", metaTags)
      .replace(
        `<!--injected-styles-->`,
        `<link rel="stylesheet" href="/assets/${cssFileName}" />`,
      )
      .replace(`<!--app-html-->`, html)
      .replace('<html lang="en">', `<html lang="${lang}">`);

    const route = url === "/" ? "" : url;

    const directory = toNativeAbsolute(`../dist${route}`);
    fs.mkdirSync(directory, { recursive: true });

    const filePath = `${directory}/index.html`;
    fs.writeFileSync(toNativeAbsolute(filePath), result);

    console.log("pre-rendered:", filePath);
  }

  process.exit(0);
};

main();
