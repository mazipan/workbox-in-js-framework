# workbox-in-js-framework
🍳 Code sample for using Workbox in various JS framework

## Workbox In Angular

For this code sample, we generated project using [Angular-CLI](https://github.com/angular/angular-cli) v1.7.2 that generated Angular v5.2.0.
This section we demonstrate how to use Workbox in your Angular project.

### 👉 Using Workbox Build

This part we will use `workbox-build` modules. Here step by step:

#### 🦄 with generateSW

We decide using generateSW when we want simple setup for our service worker and not using any other API for PWA, here the steps:

1. First we can create new Angular Project with Angular-CLI with command:

  `ng new my-project`

1. Install dependencies (if not automated) with `npm i` or `yarn install`

1. Add dependency `workbox-build` with command:

   npm: `npm i --save-dev workbox-build`
   yarn: `yarn add workbox-build -D`

1. Create new file for generating our service worker, let's name it `sw-build.js`, we put in root folder.

1. Add simple setup in file `sw-build.js` with script like this:

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

1. Try running build for first time with command: `npm run build`
  It will create new folder `./dist` as our output result.

1. Try running `workbox-build` script with `node ./sw-build.js`.
  It should create file `sw.js` in `./dist` folder.

1. Automate in build process. Just modify `build` script in `package.json`

  ```js
  "scripts": {
    "build": "ng build --prod && node ./sw-build.js"
  }
  ```

#### 🐍 with injectManifest


### 👉 Using Workbox CLI

This part we will use `Workbox CLI` modules. Here step by step:

#### 🦄 with generateSW

#### 🐍 with injectManifest



## See Others Codes

1. [Workbox in Vue.js](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-vuejs)
1. [Workbox in Angular](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-angular)
1. [Workbox in React](https://github.com/mazipan/workbox-in-js-framework/tree/workbox-in-react)

Copyright © 2018 by Irfan Maulana
