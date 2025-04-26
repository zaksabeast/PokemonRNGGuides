// eslint-disable-next-line no-restricted-imports -- ~/rngTools is the only place where using the rng_tools lib is okay
import * as RngTools from "rng_tools";
import { expose } from "comlink";

//NO_PROD
(globalThis as any).js_log = function (...args: any[]) {
  console.log(...args);
};

expose(RngTools);
