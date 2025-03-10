self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    (async function (): Promise<Response> {
      try {
        return await fetch(event.request);
      } catch {
        // @ts-expect-error -- We'll try our best to return a response,
        // but not much we can do if it fails at this point.
        return caches.match(event.request);
      }
    })(),
  );
});
