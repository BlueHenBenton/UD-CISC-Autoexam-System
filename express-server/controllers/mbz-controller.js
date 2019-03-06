const awaitTemp = require('../utilities/await-temp');
const awaitFs = require('await-fs');
const del = require('del');

async function parseAndSaveMbz(req, res) {
  const dir = await awaitTemp.mkdir();
  await del(dir + '/**', { force: true });
  res.send(dir);
}

module.exports = {
  parseAndSaveMbz
}
