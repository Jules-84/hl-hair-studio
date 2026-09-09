const CACHE="hl-hair-studio-v31-1-admin-sync-fix-1";

const STATIC=[
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./admin/"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;

  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;

  // Always prefer the newest live code/config. This prevents old app.js/cloud.js
  // from surviving after a GitHub update.
  if(
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/cloud.js") ||
    url.pathname.endsWith("/supabase-config.js") ||
    url.pathname.endsWith("/sw.js")
  ){
    event.respondWith(
      fetch(req,{cache:"no-store"}).catch(()=>caches.match(req))
    );
    return;
  }

  // Network-first for the rest, with cache fallback for offline use.
  event.respondWith(
    fetch(req)
      .then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(cache=>cache.put(req,copy));
        return res;
      })
      .catch(()=>caches.match(req).then(cached=>cached||caches.match("./index.html")))
  );
});
