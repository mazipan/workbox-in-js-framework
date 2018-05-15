# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Workbox Introduction

Workbox have at least 3 modules that we can use depends on our use case, [Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli), [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) and [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin). All these 3 modules can generate our service worker in several way that almost same in each modules. We just need to choose our best match and enjoyed one.


+ [Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli) wraps the **workbox-build** module, and provides an easy way of integrating Workbox into a command line build process, with flexible configurations.

+ [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) is perfect for developers wanting to **programmatically generate the service worker in Node** or are **using Gulp** for their build process.

+ [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) is ideal for **developers using webpack** to build their project.


## Workbox Modes

For using Workbox, at least we need to know which *Mode* that fit with our condition and environment. We need to know these two Workbox's mode:

#### generateSW

**👍 When to use generateSW**

+ You want to precache files.
+ You have simple runtime configuration needs (e.g. the configuration allows you to define routes and strategies).

**👎 When NOT to use generateSW**

+ You want to use other Service Worker features (i.e. Web Push).
+ You want to import additional scripts or add additional logic.

#### injectManifest

**👍 When to use injectManifest**

+ You want more control over your service worker.
+ You want to precache files.
+ You have more complex needs in terms of routing.
+ You would like to use your service worker with other API's (e.g. Web Push).

**👎 When NOT to use injectManifest**

+ You want the easiest path to adding a service worker to your site.


## Available Codes

1. [Workbox Introduction](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-intro)
1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-react)


Copyright © 2018 by Irfan Maulana
