const awaitTemp = require('../utilities/await-temp');
const fs = require('fs-extra'); // like node's 'fs', but with more methods and *promise support*.
const del = require('del');
const extractMbz = require('../utilities/extract-mbz');

async function parseAndSaveMbz(req, res) {
  const dir = await awaitTemp.mkdir();
  await fs.writeFile(dir + '/upload.mbz', req.body);
  await extractMbz(dir + '/upload.mbz', dir + '/extracted');
//  await del(dir + '/**', { force: true });
  res.send(dir);
}

module.exports = {
  parseAndSaveMbz
}
