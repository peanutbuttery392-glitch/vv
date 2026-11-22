const C='vae-v8';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r});
const cached=caches.match(e.request,{ignoreSearch:true});
e.respondWith(new Promise(res=>{let d=false;const f=v=>{if(!d){d=true;clearTimeout(t);res(v)}};const t=setTimeout(()=>cached.then(m=>{if(m)f(m)}),3000);
net.then(f).catch(()=>cached.then(m=>f(m||caches.match('./index.html'))))}))});
