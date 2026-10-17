import { JSDOM, VirtualConsole } from "jsdom";
import { populateGlobal, type Environment } from "vitest/runtime";

/**
 * Vitest's built-in jsdom environment sets `runScripts`, which builds the window with
 * Node's `vm` DONT_CONTEXTIFY option that Bun doesn't support. Guides don't need inline scripts.
 */
const jsdomEnvironment: Environment = {
  name: "bun-jsdom",
  viteEnvironment: "client",
  setup: (global) => {
    // Leaves out "not-implemented", which fires for every canvas and pseudo-element lookup
    const virtualConsole = new VirtualConsole().forwardTo(console, {
      jsdomErrors: ["css-parsing", "resource-loading", "unhandled-exception"],
    });

    const dom = new JSDOM("<!DOCTYPE html>", {
      url: "http://localhost:3000",
      pretendToBeVisual: true,
      virtualConsole,
    });

    const { keys, originals } = populateGlobal(global, dom.window, {
      bindFunctions: true,
    });

    return {
      teardown: (teardownGlobal) => {
        dom.window.close();

        for (const key of keys) {
          // eslint-disable-next-line no-param-reassign -- Teardown has to remove the globals setup added
          delete teardownGlobal[key];
        }

        for (const [key, descriptor] of originals) {
          Object.defineProperty(teardownGlobal, key, descriptor);
        }
      },
    };
  },
};

export default jsdomEnvironment;
