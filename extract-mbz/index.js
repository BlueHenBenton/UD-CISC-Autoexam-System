const tar = require('tar');
const mkdirp = require('mkdirp');

async function untar(inPath, outPath) {
  mkdirp(outPath, (err) => {
    if (err) throw err;
  });
  await tar.x({
    file: inPath,
    C: outPath
  });
}

if (process.argv.length < 3 || process.argv.length > 4) {
  console.error('Please provide 1-2 arguments.');
}

untar(process.argv[2], process.argv[3] || 'out').then(() => console.log('Done.'));
