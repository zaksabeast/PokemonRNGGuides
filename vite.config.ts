import { defineConfig } from "vite";
import path from "path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import wasm from "vite-plugin-wasm";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, PhrasingContent } from "mdast";

type AlertType = "NOTE" | "TIP" | "WARNING" | "CAUTION" | "IMPORTANT";
type AlertHeader = `[!${AlertType}]`;

const BLOCKQUOTE_HEADER_MAP = {
  "[!NOTE]": "NOTE",
  "[!TIP]": "TIP",
  "[!WARNING]": "WARNING",
  "[!CAUTION]": "CAUTION",
  "[!IMPORTANT]": "IMPORTANT",
} as const satisfies Record<AlertHeader, AlertType>;

const getAlertHeader = (
  text: string,
): { type: AlertType; header: AlertHeader } | null => {
  for (const [header, type] of Object.entries(BLOCKQUOTE_HEADER_MAP) as [
    AlertHeader,
    AlertType,
  ][]) {
    if (text.startsWith(header)) {
      return { type, header };
    }
  }

  return null;
};

const remarkGithubAlerts: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const first = node.children?.[0];

      if (first?.type === "paragraph" && first.children?.[0]?.type === "text") {
        const text = first.children[0].value;
        const alertHeader = getAlertHeader(text);

        // Strip the alert header from the first text node if present
        if (alertHeader != null) {
          const stripped = text
            .slice(alertHeader.header.length)
            .replace(/^\n/, "");
          first.children[0].value = stripped;
        }

        // Convert all \n in every text node to break nodes across the blockquote
        for (const child of node.children) {
          if (child.type === "paragraph") {
            child.children = child.children.flatMap(
              (phrasingChild): PhrasingContent[] => {
                if (
                  phrasingChild.type !== "text" ||
                  !phrasingChild.value.includes("\n")
                ) {
                  return [phrasingChild];
                }
                return phrasingChild.value
                  .split("\n")
                  .flatMap((line, i, lines): PhrasingContent[] => {
                    const isLast = i === lines.length - 1;
                    return isLast
                      ? [{ type: "text", value: line }]
                      : [{ type: "text", value: line }, { type: "break" }];
                  });
              },
            );
          }
        }

        if (alertHeader != null) {
          // eslint-disable-next-line -- This is fine since it's part of a plugin, and we expect it to mutate
          node.data = {
            hName: "blockquote",
            hProperties: {
              "alert-type": alertHeader.type,
            },
          };
        }
      }
    });
  };
};

export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGithubAlerts,
        remarkGfm,
      ],
    }),
    react(),
    babel({
      presets: ["@babel/preset-typescript", reactCompilerPreset()],
    }),
    wasm(),
  ],
  css: {
    // postcss.config.js purges against the prerendered dist HTML, so it only runs in minimize-css
    postcss: {},
  },
  build: {
    // Minimum browsers that support top-level await (required for WASM)
    target: ["chrome89", "edge89", "firefox89", "safari15"],
  },
  worker: {
    plugins: () => [wasm()],
    format: "es",
  },
  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "src"),
      rng_tools: path.resolve(import.meta.dirname, "rng_tools/pkg"),
    },
  },
  optimizeDeps: {
    exclude: ["rng_tools"],
  },
  ssr: {
    target: "webworker", // A bit stricter, which helps with ssg
  },
});
