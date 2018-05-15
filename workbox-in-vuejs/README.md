# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Outline

1. [Workbox In Vue.js](#workbox-in-vuejs)
1. [Create Vue Project with Vue-CLI v2.9.2](#create-vue-project-with-vue-cli-v292)
1. [👉 Using Workbox Webpack Plugin](#-using-workbox-webpack-plugin)
    1. [🦄 Workbox Webpack Plugin with generateSW](#-workbox-webpack-plugin-with-generatesw)
    1. [🐍 Workbox Webpack Plugin with injectManifest](#-workbox-webpack-plugin-with-injectmanifest)
1. [👉 Using Workbox Build](#-using-workbox-build)
    1. [🦄 Workbox Build with generateSW](#-workbox-build-with-generatesw)
    1. [🐍 Workbox Build with injectManifest](#-workbox-build-with-injectmanifest)
1. [👉 Using Workbox CLI](#-using-workbox-cli)
    1. [🦄 Workbox CLI with generateSW](#-workbox-cli-with-generatesw)
    1. [🐍 Workbox CLI with injectManifest](#-workbox-cli-with-injectmanifest)
1. [Install Service Worker in Vue.js](#install-service-worker-in-vuejs)
1. [See Others Codes](#see-others-codes)


## Workbox In Vue.js

We will using Vue-CLI v2.9.2 for generating Vue skeleton. We expecting You will using official [webpack template](https://github.com/vuejs-templates/webpack) from [vuejs-templates](https://github.com/vuejs-templates), because now this template is not supported PWA we can insert Workbox to generate our service worker into build proccess.

We will introduce you 3 different modules CLI, workbox-build and webpack-plugin. Why ? Because sometimes we need to lookup the different point of view and need to find different approach. Vue.js is very configurable in terms of build process, we can modify the process with ease.

## Create Vue Project with Vue-CLI v2.9.2

1. Create new project with command `vue init webpack my-project`

2. Install dependencies: `npm i`

3. Run production for first time: `npm run build`

[🔼 back to top](#outline)

## 👉 Using Workbox Webpack Plugin

This part we will use `workbox-webpack-plugin` modules. Here step by step:

1. Add dependency `workbox-webpack-plugin` with command: `npm i --save-dev workbox-webpack-plugin` or `yarn add workbox-webpack-plugin -D`

[🔼 back to top](#outline)

### 🦄 Workbox Webpack Plugin with generateSW

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

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-webpack-plugin/generateSW/my-project

[🔼 back to top](#outline)

### 🐍 Workbox Webpack Plugin with injectManifest

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

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-webpack-plugin/injectManifest/my-project

[🔼 back to top](#outline)

## 👉 Using Workbox Build

This part we will use `workbox-build` modules. Here step by step:

1. Add dependency `workbox-build` with command: `npm i --save-dev workbox-build` or `yarn add workbox-build -D`

[🔼 back to top](#outline)

### 🦄 Workbox Build with generateSW

1. Add new js file in `./build/workbox.build.js`

2. Put this below script:

  ```js
  const { generateSW } = require('workbox-build');

  const swDest = 'dist/sw.js';
  generateSW({
    swDest,
    globDirectory: 'dist'
  }).then(({count, size}) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  });
  ```

3. Run with command `node build/workbox.build.js`

4. Integrate in build process, just edit `package.json`

  ```js
  "scripts": {
    "build": "node build/build.js && node build/workbox.build.js"
  }
  ```

5. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-build/generateSW/my-project

[🔼 back to top](#outline)

### 🐍 Workbox Build with injectManifest

1. Add new js file in `./build/workbox.build.js`

2. Put this below script:

  ```js
  const { injectManifest } = require('workbox-build');

  const swSrc = './sw-template.js';
  const swDest = 'dist/sw.js';
  injectManifest({
    swSrc,
    swDest,
    globDirectory: 'dist'
  }).then(({count, size}) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  });
  ```

3. Create `sw-template.js` file in root folder with script like this:

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

4. Run with command `node build/workbox.build.js`

5. Integrate in build process, just edit `package.json`

  ```js
  "scripts": {
    "build": "node build/build.js && node build/workbox.build.js"
  }
  ```

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-build/injectManifest/my-project

[🔼 back to top](#outline)

## 👉 Using Workbox CLI

This part we will use `Workbox CLI` modules. Here step by step:

1. Install `Workbox CLI` with command `npm install workbox-cli --global` or `yarn global add workbox-cli`

### 🦄 Workbox CLI with generateSW

1. Add new config file in `./config/workbox-config.js`

2. Put this script:

  ```js
  module.exports =  {
    swDest: 'dist/sw.js',
    globDirectory: 'dist'
  }
  ```

3. Run with command `workbox generateSW ./workbox-config.js`

4. Integrate in build process, just edit `package.json`

  ```js
  "scripts": {
    "build": "node build/build.js && workbox generateSW ./workbox-config.js"
  }
  ```

5. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-cli/generateSW/my-project

[🔼 back to top](#outline)

### 🐍 Workbox CLI with injectManifest

1. Add new config file in `./config/workbox-config.js`

2. Put this script:

  ```js
  module.exports =  {
    swSrc: './sw-template.js',
    swDest: 'dist/sw.js',
    globDirectory: 'dist'
  }
  ```

3. Create `sw-template.js` file in root folder with script like this:

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

4. Run with command `workbox injectManifest ./workbox-config.js`

5. Integrate in build process, just edit `package.json`

  ```js
  "scripts": {
    "build": "node build/build.js && workbox injectManifest ./workbox-config.js"
  }
  ```

6. See sample code: https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs/using-workbox-cli/injectManifest/my-project

[🔼 back to top](#outline)

## Install Service Worker in Vue.js

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

[🔼 back to top](#outline)


## See Others Codes

1. [Workbox Introduction](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-intro)
1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/master/workbox-in-react)

[🔼 back to top](#outline)


Copyright © 2018 by Irfan Maulana
