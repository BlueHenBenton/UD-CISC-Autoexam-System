/** This module just exports a promisified API for the mkdir function in the temp module. */
const temp = require('temp');

/**
 * Create a temporary directory. Return the path to that directory.
 * Note: this is an async function. It returns a promise. You have to either `await` it or `.catch().then()` it.
 */
function mkdir() {
  return new Promise((resolve, reject) => {
    temp.mkdir('', (err, dirPath) => {
      if (err) reject(err);
      else resolve(dirPath);
    });
  });
}

module.exports = {
  mkdir
}
