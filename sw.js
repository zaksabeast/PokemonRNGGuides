// Replaces caching workers that returning visitors still have registered at this path, then removes itself.
const deleteAllCaches = async () => {
  const cacheNames = await self.caches.keys();

  await Promise.all(
    cacheNames.map((cacheName) => self.caches.delete(cacheName)),
  );
};

const reloadOpenWindows = async () => {
  const windowClients = await self.clients.matchAll({ type: "window" });

  await Promise.all(windowClients.map((client) => client.navigate(client.url)));
};

const removeServiceWorker = async () => {
  await deleteAllCaches();
  await self.registration.unregister();
  await reloadOpenWindows();
};

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(removeServiceWorker());
});
