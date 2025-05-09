import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
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
  worker: {
    plugins: () => [wasm()],
    format: "es",
  },
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["rng_tools"],
  },
  ssr: {
    target: "webworker", // A bit stricter, which helps with ssg
  },
});
