import { defineConfig } from "vite";
import path from "path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { VitePWA } from "vite-plugin-pwa";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    }),
    react(),
    babel({
      presets: ["@babel/preset-typescript", reactCompilerPreset()],
    }),
    wasm(),
    VitePWA({
      registerType: "autoUpdate",
      selfDestroying: true,
      srcDir: "src",
      filename: "sw.js",
      workbox: {
        maximumFileSizeToCacheInBytes: 4000000,
        navigateFallbackDenylist: [/\//],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => !url.pathname.endsWith(".wasm"),
            handler: "NetworkFirst",
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".wasm"),
            handler: "CacheFirst",
            options: {
              cacheName: "wasm-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: "PokemonRNG.com",
        short_name: "PokemonRNG.com",
        start_url: "/",
        display: "standalone",
        description: "Guaranteed perfect shinies",
      },
    }),
  ],
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
      "~": path.resolve(__dirname, "src"),
      rng_tools: path.resolve(__dirname, "rng_tools/pkg"),
    },
  },
  optimizeDeps: {
    exclude: ["rng_tools"],
  },
  ssr: {
    target: "webworker", // A bit stricter, which helps with ssg
  },
});
