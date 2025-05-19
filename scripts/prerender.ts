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
  const lightFileName = `light-${md5(antdStyles.light).slice(0, 8)}.css`;
  const darkFileName = `dark-${md5(antdStyles.dark).slice(0, 8)}.css`;
  const lightCssFile = toNativeAbsolute(`../dist/assets/${lightFileName}`);
  const darkCssFile = toNativeAbsolute(`../dist/assets/${darkFileName}`);
  fs.writeFileSync(lightCssFile, antdStyles.light);
  fs.writeFileSync(darkCssFile, antdStyles.dark);

  for (const url of routes) {
    const { html, emotionStyles, metaTags, lang } = await render(url);

    const result = template
      .replace("<!--injected-meta-tags-->", metaTags)
      .replace(
        `<!--injected-styles-->`,
        `<style data-emotion>${emotionStyles}</style>
        <link rel="stylesheet" href="/assets/${lightFileName}" />
        <link rel="stylesheet" href="/assets/${darkFileName}" />`,
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
