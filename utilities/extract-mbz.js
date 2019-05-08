const tar = require('tar');
const mkdirp = require('mkdirp');

/** Extracts the given `.mbz` file into the given directory. */
module.exports = async function extractMbz(inPath, outPath) {
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
