const tar = require('tar');

async function untar(inPath, outPath) {
  await tar.x({
    file: inPath,
    C: outPath
  });
}

if (process.argv.length < 3 || process.argv.length > 4) {
  console.error('Please provide 1-2 arguments.');
}

untar(process.argv[2], process.argv[3] || 'out').then(() => console.log('Done.'));
