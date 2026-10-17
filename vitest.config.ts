import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const ignoredLogs = [
  // Dev-mode analytics from src/analytics.ts
  /^\[TRACK\]/,
  /^Warning: \[antd: [^\]]+\] .*deprecated/,
];

export default mergeConfig(
  viteConfig,
  defineConfig({
    // vite-plugin-wasm only inlines .wasm (instead of fetching it) when it finds
    // a plugin named "vitest", which Vitest 5 no longer registers
    plugins: [{ name: "vitest" }],
    test: {
      environment: "./guideTests/setup/jsdomEnvironment.ts",
      // bun test picks up *.test.* and *.spec.*, so guide tests use their own suffix
      include: ["guideTests/**/*.e2e.{ts,tsx}"],
      setupFiles: [
        "guideTests/setup/dom.ts",
        "guideTests/setup/inProcessWorker.ts",
      ],
      testTimeout: 60_000,
      onConsoleLog: (log) => !ignoredLogs.some((pattern) => pattern.test(log)),
    },
  }),
);
