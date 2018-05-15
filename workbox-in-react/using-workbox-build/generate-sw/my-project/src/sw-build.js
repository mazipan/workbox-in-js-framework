const { generateSW } = require('workbox-build');

  const swDest = 'build/sw.js';
  generateSW({
    swDest,
    globDirectory: 'build'
  }).then(({count, size}) => {
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  });
