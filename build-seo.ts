/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { routes } from "./src/routes/defs";
import { getGuide } from "./src/guides";

const distDir = "dist";
const templatePath = path.join(distDir, "index.html");

// Read and parse the template HTML
const templateHtml = fs.readFileSync(templatePath, "utf8");
const $ = cheerio.load(templateHtml);

const getMetadata = (route: (typeof routes)[number]) => {
  const guide = getGuide(route);
  return guide.meta;
};

for (const route of routes) {
  const { title, description } = getMetadata(route) ?? {};

  // Clone the original HTML for this route
  const page = $.root().clone();

  // Update meta tags
  page.find("title").text(title);
  page.find('meta[name="title"]').attr("content", title);
  page.find('meta[name="description"]').attr("content", description);

  page.find('meta[property="og:title"]').attr("content", title);
  page.find('meta[property="og:description"]').attr("content", description);
  page
    .find('meta[property="og:url"]')
    .attr("content", `https://pokemonrng.com${route}`);

  page.find('meta[property="twitter:title"]').attr("content", title);
  page
    .find('meta[property="twitter:description"]')
    .attr("content", description);

  // Determine output path
  const outputPath = path.join(distDir, route, "index.html");

  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Write updated HTML
  const html = page.html();
  if (html == null) {
    throw new Error("Unexpected null html");
  }
  fs.writeFileSync(outputPath, html, "utf8");

  console.log(`Generated: ${outputPath}`);
}

console.log("Meta tag injection complete.");
