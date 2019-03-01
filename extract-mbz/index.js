const tar = require('tar');

async function untar(inPath, outPath) {
  await tar.x({
    file: inPath,
    C: outPath
  });
}

untar('sample.mbz', 'out').then(() => console.log('Done.'));
