const version = 2;
const cacheName = `csc-cache-v${version}`;
const indexFilename = `${location.pathname.match("((?:/central-supply-catalog/)?)")[0]}_data/searchindex.json`;
console.log(`indexFilename: ${indexFilename}`);

self.addEventListener("install", (ev) => {
  console.log(`Version ${cacheName} installed`);
  ev.waitUntil( () => {
    const cache = caches.open(cacheName);
    cache.add(indexFilename);
  }

    // caches.open(cacheName).then((cache) => {
    //   cache.add(indexFilename)
    //     .then(() => console.log(`${cacheName} has been updated`)),
    //     (err) => {
    //       console.warn(`Failed to update ${cacheName}`);
    //     };
    // })
  );
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key != cacheName).map((key) => caches.delete(key)));
    })
  );
  console.log(`Version ${cacheName} activated`);
});

const BS_MARKER = "/browser-sync/";

self.addEventListener("fetch",  async ({ request }) => {
  if (request.url.indexOf(BS_MARKER) > -1) {
    return fetch(request);
  }

  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  await cache.put(request, response.clone());
  return response;
});


