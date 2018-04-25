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
