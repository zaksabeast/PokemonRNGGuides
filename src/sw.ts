type ServiceWorkerFetchEvent = Event & {
  request: Request;
  respondWith: (response: Promise<Response>) => void;
};

self.addEventListener("fetch", (event) => {
  const fetchEvent = event as ServiceWorkerFetchEvent;

  fetchEvent.respondWith(
    (async function (): Promise<Response> {
      try {
        return await fetch(fetchEvent.request);
      } catch {
        // @ts-expect-error -- We'll try our best to return a response,
        // but not much we can do if it fails at this point.
        return caches.match(fetchEvent.request);
      }
    })(),
  );
});
