const temp = require('temp');

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
