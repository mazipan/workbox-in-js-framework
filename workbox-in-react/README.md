# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Outline

1. [Workbox In React.js](#workbox-in-reactjs)
1. [Create React Project](#create-react-project)
1. [👉 Using Workbox Build](#-using-workbox-build)
    1. [🦄 Workbox Build with generateSW](#-workbox-build-with-generatesw)
    1. [🐍 Workbox Build with injectManifest](#-workbox-build-with-injectmanifest)
1. [👉 Using Workbox CLI](#-using-workbox-cli)
    1. [🦄 Workbox CLI with generateSW](#-workbox-cli-with-generatesw)
    1. [🐍 Workbox CLI with injectManifest](#-workbox-cli-with-injectmanifest)
1. [Install Service Worker in React.js](#install-service-worker-in-reactjs)
1. [See Others Codes](#see-others-codes)

## Workbox In React.js

By default, `create-react-app` has been support PWA and generate service-worker file. But in this section we will show you how we using Workbox as our service-worker generate tools instead using the default one and we will doing this without any `eject` workaround.

[🔼 back to top](#outline)

## Create React Project

1. First we can create new React Project with `create-react-app` with command: `npx create-react-app my-project`

2. Try running build for first time with command: `yarn build`
  It will create new folder `./build` as our output result.

[🔼 back to top](#outline)

## 👉 Using Workbox Build

This part we will use `workbox-build` modules. Here step by step:

1. Add dependency `workbox-build` with command:
   npm: `npm i --save-dev workbox-build`
   yarn: `yarn add workbox-build -D`

[🔼 back to top](#outline)

### 🦄 Workbox Build with generateSW

We decide using `generateSW` when we want simple setup for our service worker and not using any other API for PWA, here the steps:

1. Create new file for generating our service worker, let's name it `sw-build.js`, we put in `./src` folder.

2. Add simple setup in file `sw-build.js` with script like this:

  ```js
  const { generateSW } = require('workbox-build');

  const swDest = 'build/sw.js';
  generateSW({
    swDest,
    globDirectory: 'build'
  }).then(({count, size}) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  });
  ```

3. Try running build for first time with command: `yarn build`
  It will create new folder `./build` as our output result.

4. Try running `workbox-build` script with `node ./sw-build.js`.
  It should create file `sw.js` in `./build` folder.

5. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "react-scripts build && node ./src/sw-build.js"
  }
  ```

6. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react/using-workbox-build/generate-sw/my-project

[🔼 back to top](#outline)

### 🐍 Workbox Build with injectManifest

We using `injectManifest` because we will create more advance script in our service-worker. The steps is almost same, but we need to prepare our service worker first that will used by workbox as template to inject precache files later. Here the step by step :

1. We need to create template for our `sw.js`, let's create new file called `sw-template.js` in `./src` folder.

2. Add this script as in `sw-template.js` file:

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

3. Create new file for generating our service worker, let's name it `sw-build.js`, we put in `src` folder.

4. Add simple setup in file `sw-build.js` with script like this:

  ```js
  const { injectManifest } = require('workbox-build');

  const swSrc = './src/sw-template.js';
  const swDest = 'build/sw.js';
  injectManifest({
    swSrc,
    swDest,
    globDirectory: 'build'
  }).then(({count, size}) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  });
  ```

5. Try running build for first time with command: `yarn build`
  It will create new folder `./build` as our output result.

6. Try running `workbox-build` script with `node ./src/sw-build.js`.
  It should create file `sw.js` in `./build` folder.

7. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "react-scripts build && node ./src/sw-build.js"
  }
  ```

8. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react/using-workbox-build/inject-manifest/my-project

[🔼 back to top](#outline)

## 👉 Using Workbox CLI

This part we will use `Workbox CLI` modules. Here step by step:

1. Install `Workbox CLI` with command `npm install workbox-cli --global` or `yarn global add workbox-cli`

### 🦄 Workbox CLI with generateSW

1. Create config file, `workbox-config.js` in `./src` folder

2. Add this script in this file:

  ```js
  module.exports =  {
    swDest: 'build/sw.js',
    globDirectory: 'build'
  }
  ```

3. Run script with command: `workbox generateSW ./src/workbox-config.js`

4. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "react-scripts build && workbox generateSW ./src/workbox-config.js"
  }
  ```

5. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react/using-workbox-cli/generate-sw/my-project

[🔼 back to top](#outline)

### 🐍 Workbox CLI with injectManifest

1. Create config file, `workbox-config.js` in `./src` folder

2. Add this script in this file:

  ```js
  module.exports = {
    swSrc: './src/sw-template.js',
    swDest: 'build/sw.js',
    globDirectory: 'build'
  }
  ```

3. We need to create template for our `sw.js`, let's create new file called `sw-template.js` in `./src` folder.

4. Add this script as in `sw-template.js` file:

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

5. Run script with command: `workbox injectManifest ./workbox-config.js`

6. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "react-scripts build && workbox injectManifest ./src/workbox-config.js"
  }
  ```

7. Check code sample here: https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react/using-workbox-cli/inject-manifest/my-project

[🔼 back to top](#outline)

## Install Service Worker in React.js

`create-react-app` by default has been support service-worker registration.
So, just need change file service-worker in `src/registerServiceWorker.js` like:

```js
// change this line
const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

// into this script
const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
```

[🔼 back to top](#outline)

## See Others Codes

1. [Workbox Introduction](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-intro)
1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react)

[🔼 back to top](#outline)


Copyright © 2018 by Irfan Maulana
