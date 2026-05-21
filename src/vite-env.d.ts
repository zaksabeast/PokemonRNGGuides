/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";

  export type { RegisterSWOptions };

  export function registerSW(
    options?: RegisterSWOptions,
  ): (reloadPage?: boolean) => Promise<void>;
}
