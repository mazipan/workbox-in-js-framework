# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Workbox In Angular

For this code sample, we generated project using [Angular-CLI](https://github.com/angular/angular-cli) v1.7.2 that generated Angular v5.2.0.
This section we demonstrate how to use Workbox in your Angular project.

## Create Angular Project

1. First we can create new Angular Project with Angular-CLI with command: `ng new my-project`

2. Install dependencies (if not automated) with `npm i` or `yarn install`

3. Try running build for first time with command: `npm run build`
  It will create new folder `./dist` as our output result.

### 👉 Using Workbox Build

This part we will use `workbox-build` modules. Here step by step:

1. Add dependency `workbox-build` with command:
   npm: `npm i --save-dev workbox-build`
   yarn: `yarn add workbox-build -D`

#### 🦄 with generateSW

We decide using `generateSW` when we want simple setup for our service worker and not using any other API for PWA, here the steps:

1. Create new file for generating our service worker, let's name it `sw-build.js`, we put in root folder.

2. Add simple setup in file `sw-build.js` with script like this:

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

3. Try running build for first time with command: `npm run build`
  It will create new folder `./dist` as our output result.

4. Try running `workbox-build` script with `node ./sw-build.js`.
  It should create file `sw.js` in `./dist` folder.

5. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "ng build --prod && node ./sw-build.js"
  }
  ```

6. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular/generate-sw/my-project


#### 🐍 with injectManifest

We using `injectManifest` because we will create more advance script in our service-worker. The steps is almost same, but we need to prepare our service worker first that will used by workbox as template to inject precache files later. Here the step by step :

1. We need to create template for our `sw.js`, let's create new file called `sw-template.js` in our root folder.

2. Add this script as in `sw-template.js` file:

  ```js
  // This is required line
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst(),
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
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

3. Create new file for generating our service worker, let's name it `sw-build.js`, we put in root folder.

4. Add simple setup in file `sw-build.js` with script like this:

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

5. Try running build for first time with command: `npm run build`
  It will create new folder `./dist` as our output result.

6. Try running `workbox-build` script with `node ./sw-build.js`.
  It should create file `sw.js` in `./dist` folder.

7. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "ng build --prod && node ./sw-build.js"
  }
  ```

8. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular/inject-manifest/my-project


### 👉 Using Workbox CLI

This part we will use `Workbox CLI` modules. Here step by step:

1. Install `Workbox CLI` with command `npm install workbox-cli --global` or `yarn global add workbox-cli`

#### 🦄 with generateSW

1. Create config file, `workbox-config.js` in root folder

2. Add this script in this file:

  ```js
  module.exports =  {
    swDest: 'dist/sw.js',
    globDirectory: 'dist'
  }
  ```

3. Run script with command: `workbox generateSW ./workbox-config.js`

4. Automate with adding script in your build process in `package.json`

5. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular/generate-sw/my-project

#### 🐍 with injectManifest

1. Create config file, `workbox-config.js` in root folder

2. Add this script in this file:

  ```js
  module.exports =  {
    swSrc: './sw-template.js',
    swDest: 'dist/sw.js',
    globDirectory: 'dist'
  }
  ```

3. Run script with command: `workbox injectManifest ./workbox-config.js`

4. Automate with adding script in your build process in `package.json`

5. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular/inject-manifest/my-project


## See Others Codes

1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react)

Copyright © 2018 by Irfan Maulana
