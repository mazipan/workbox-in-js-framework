const { generateSW } = require('workbox-build');

const swDest = 'dist/sw.js';
generateSW({
  swDest,
  globDirectory: 'dist'
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
