import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { Provider, createStore } from "jotai";
import { afterAll } from "vitest";
import { App } from "~/app";
import type { Route } from "~/routes/defs";

let closeCurrentGuide: (() => void) | null = null;

const closeGuide = () => {
  closeCurrentGuide?.();
  closeCurrentGuide = null;
};

afterAll(closeGuide);

/**
 * Renders the whole app at a guide route, like opening it in a fresh browser tab.
 * Rendering closes the previous guide instead of each test, so a guide opened
 * in beforeAll stays open for its whole group. It isn't wrapped in act(),
 * so React schedules updates like a browser and tests wait for the DOM instead.
 */
export const renderGuide = (route: Route) => {
  closeGuide();
  window.localStorage.clear();

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  const { hook } = memoryLocation({ path: route });

  root.render(
    <Provider store={createStore()}>
      <Router hook={hook}>
        <App updateSw={() => {}} />
      </Router>
    </Provider>,
  );

  closeCurrentGuide = () => {
    root.unmount();
    container.remove();
  };

  return container;
};
