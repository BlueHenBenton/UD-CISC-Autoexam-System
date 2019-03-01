const tar = require('tar');
const mkdirp = require('mkdirp');

async function untar(inPath, outPath) {
  // Create directory if it doesn't exist.
  mkdirp(outPath, (err) => {
    if (err) throw err;
  });
  // Extract the input file to that directory.
  await tar.x({
    file: inPath,
    C: outPath
  });
}

// CLI: convenient now, not necessary in the future.

if (process.argv.length < 3 || process.argv.length > 4) {
  console.error('Please provide 1-2 arguments.');
}

untar(process.argv[2], process.argv[3] || 'out').then(() => console.log('Done.'));
