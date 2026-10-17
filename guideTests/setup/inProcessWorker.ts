// eslint-disable-next-line no-restricted-imports -- Test stand-in for src/rngTools/worker.ts
import * as RngTools from "rng_tools";
import { expose } from "comlink";
import { afterAll, vi } from "vitest";

type Listener = (event: { data: unknown }) => void;

// ~/rngTools keeps its shared worker for the whole page, so tests close it after each file
const openWorkers = new Set<InProcessRngToolsWorker>();

/**
 * Runs rng_tools in-process like src/rngTools/worker.ts, with messages still structured-cloned.
 * Listeners are tracked by hand because jsdom's EventTarget rejects the runtime's AbortSignals.
 */
class InProcessRngToolsWorker {
  #port: MessagePort;
  #exposedPort: MessagePort;
  #listeners = new Map<string, Set<Listener>>();

  constructor() {
    const { port1, port2 } = new MessageChannel();
    expose(RngTools, port2);

    port1.addEventListener("message", (event) => {
      this.#dispatch("message", event.data);
    });

    port1.start();
    this.#port = port1;
    this.#exposedPort = port2;
    openWorkers.add(this);

    // spawnRngToolWorker attaches its listener synchronously after construction
    queueMicrotask(() => this.#dispatch("message", { ready: true }));
  }

  addEventListener(
    type: string,
    listener: Listener,
    options?: { signal?: AbortSignal },
  ) {
    if (options?.signal?.aborted) {
      return;
    }

    const listeners = this.#listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(type, listeners);

    options?.signal?.addEventListener(
      "abort",
      () => {
        this.removeEventListener(type, listener);
      },
      { once: true },
    );
  }

  removeEventListener(type: string, listener: Listener) {
    this.#listeners.get(type)?.delete(listener);
  }

  postMessage(data: unknown, transfer: Transferable[] = []) {
    this.#port.postMessage(data, transfer);
  }

  terminate() {
    this.#port.close();
    this.#exposedPort.close();
    this.#listeners.clear();
    openWorkers.delete(this);
  }

  #dispatch(type: string, data: unknown) {
    for (const listener of this.#listeners.get(type) ?? []) {
      listener({ data });
    }
  }
}

vi.stubGlobal("Worker", InProcessRngToolsWorker);

afterAll(() => {
  for (const worker of openWorkers) {
    worker.terminate();
  }
});
