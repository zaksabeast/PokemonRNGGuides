import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 4000000,
        navigateFallbackDenylist: [/\.zip$/, /\.gm9$/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.endsWith(".zip") || url.pathname.endsWith(".gm9"),
            handler: "NetworkFirst",
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
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
