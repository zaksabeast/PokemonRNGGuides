import { vi } from "vitest";

// jsdom doesn't implement these, but antd, the theme, and the stepper use them
vi.stubGlobal(
  "matchMedia",
  (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
);

vi.stubGlobal(
  "ResizeObserver",
  class {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
  },
);

window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

// Timers create the shared context and decode the beep file on mount.
// Tests don't play beeps, so these only need to exist.
vi.stubGlobal(
  "AudioContext",
  class extends EventTarget {
    state = "suspended";
    currentTime = 0;
    resume = async () => {};
    decodeAudioData = async () => ({ duration: 0 });
  },
);

// Same-origin URLs are the site's own assets (e.g. the beep file), which tests don't need.
// Anything else would be a real network request, so it fails the test instead.
vi.stubGlobal("fetch", async (input: RequestInfo | URL) => {
  const url = input instanceof Request ? input.url : String(input);
  if (new URL(url, location.href).origin === location.origin) {
    return new Response(new ArrayBuffer(0));
  }

  throw new Error(`Guide tests shouldn't make network requests: ${url}`);
});
