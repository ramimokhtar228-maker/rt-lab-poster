/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8ff560e9cc44a5e636f5a6f6b2d5f8a7"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c5eceeea8cb257dc938849e48d34089f"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ee2a351740e31ad6c9b801c99dcf6fc2"
  }, {
    "url": "index.html",
    "revision": "62c9fcad1b67edd73e95a98ae7841706"
  }, {
    "url": "icon.svg",
    "revision": "a0a99b1d8eceb12ae46e9472528b7b13"
  }, {
    "url": "favicon.ico",
    "revision": "c161456860d50b72412749ec84633c72"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "977e7d3df718d92b281516793cfa1258"
  }, {
    "url": "images/rt_poster_wide_1791310287882.jpg",
    "revision": "f45eefae75fc679b866cea60d88f183a"
  }, {
    "url": "images/rt_poster_story_1791310277019.jpg",
    "revision": "5bed8b0f114cea785a81b6992b95f917"
  }, {
    "url": "images/rt_poster_square_1791310264774.jpg",
    "revision": "b493e95026435d2acb8d60c5380faeae"
  }, {
    "url": "assets/rt_poster_wide_1791310287882-BKUFVbxx.jpg",
    "revision": null
  }, {
    "url": "assets/rt_poster_story_1791310277019-DxgdJLag.jpg",
    "revision": null
  }, {
    "url": "assets/rt_poster_square_1791310264774-Cnh5I9sZ.jpg",
    "revision": null
  }, {
    "url": "assets/index-CONqiMsA.css",
    "revision": null
  }, {
    "url": "assets/index-C24EAPyb.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "977e7d3df718d92b281516793cfa1258"
  }, {
    "url": "favicon.ico",
    "revision": "c161456860d50b72412749ec84633c72"
  }, {
    "url": "icon.svg",
    "revision": "a0a99b1d8eceb12ae46e9472528b7b13"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ee2a351740e31ad6c9b801c99dcf6fc2"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c5eceeea8cb257dc938849e48d34089f"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8ff560e9cc44a5e636f5a6f6b2d5f8a7"
  }, {
    "url": "manifest.webmanifest",
    "revision": "aaae8a94b2193cc477d56c4c50d0fa38"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
