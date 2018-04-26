const { injectManifest } = require('workbox-build');

const swSrc = './src/sw-template.js';
const swDest = 'build/sw.js';
injectManifest({
  swSrc,
  swDest,
  globDirectory: 'build'
}).then(({ count, size }) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
