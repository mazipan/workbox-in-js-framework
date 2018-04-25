# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Workbox In Vue.js

We will using Vue-CLI v2.9.2 for generating Vue skeleton. We expecting You will using official [webpack template](https://github.com/vuejs-templates/webpack) from [vuejs-templates](https://github.com/vuejs-templates), because now this template is not supported PWA we can insert Workbox to generate our service worker into build proccess.

We will introduce you 3 different modules CLI, workbox-build and webpack-plugin. Why ? Because sometimes we need to lookup the different point of view and need to find different approach. Vue.js is very configurable in terms of build process, we can modify the process with ease.

## Create Vue Project with Vue-CLI v2.9.2

1. Create new project with command `vue init webpack my-project`

2. Install dependencies: `npm i`

3. Run production for first time: `npm run build`

------------------------------------------------------------

## 👉 Using Workbox Webpack Plugin

This part we will use `workbox-webpack-plugin` modules. Here step by step:

1. Add dependency `workbox-webpack-plugin` with command: `npm i --save-dev workbox-webpack-plugin` or `yarn add workbox-webpack-plugin -D`

### 🦄 with generateSW

1. We will modify in webpack build process, open file `./build/webpack.prod.conf.js`

2. Import `GenerateSW` with script

  ```js
  // ... other webpack plugin import
  const { GenerateSW } = require('workbox-webpack-plugin')
  ```

3. Look into `plugins: []` configuration, we will add script in this section

4. Add this script in very last of `plugins: []` configuration

  ```js
  new GenerateSW({
    swDest: path.join(config.build.assetsRoot, '/sw.js'),
    precacheManifestFilename: path.join(config.build.assetsSubDirectory, '/precache.[manifestHash].js')
  })
  ```

5. Run build again `npm run build`

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs/using-workbox-webpack-plugin/generateSW/my-project

### 🐍 with injectManifest

1. We will modify in webpack build process, open file `./build/webpack.prod.conf.js`

2. Import `InjectManifest` with script

  ```js
  // ... other webpack plugin import
  const { InjectManifest } = require('workbox-webpack-plugin')
  ```

3. Look into `plugins: []` configuration, we will add script in this section

4. Add this script in very last of `plugins: []` configuration

  ```js
  new InjectManifest({
    swSrc: './sw-template.js',
    swDest: path.join(config.build.assetsRoot, '/sw.js'),
    precacheManifestFilename: path.join(config.build.assetsSubDirectory, '/precache.[manifestHash].js')
  })
  ```

5. Create `sw-template.js` file in root folder with script like this:

  ```js
  // This is required line
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst(),
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|js|css|html)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
  ```

5. Run build again `npm run build`

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs/using-workbox-webpack-plugin/injectManifest/my-project

------------------------------------------------------------

## 👉 Using Workbox Build

This part we will use `workbox-build` modules. Here step by step:

1. Add dependency `workbox-build` with command: `npm i --save-dev workbox-build` or `yarn add workbox-build -D`

### 🦄 with generateSW

### 🐍 with injectManifest

------------------------------------------------------------

## 👉 Using Workbox CLI

This part we will use `Workbox CLI` modules. Here step by step:

1. Install `Workbox CLI` with command `npm install workbox-cli --global` or `yarn global add workbox-cli`

### 🦄 with generateSW

### 🐍 with injectManifest

------------------------------------------------------------

## Manual Install Service Worker in Vue.js

Add this below script in your `./src/main.js`

  ```js
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log('Service Worker has been registered');
      })
      .catch(e =>
        console.error('Error during service worker registration:', e)
      );
  } else {
    console.warn('Service Worker is not supported');
  }
  ```
## See Others Codes


1. [Workbox Introduction](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-intro)
1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react)

Copyright © 2018 by Irfan Maulana
