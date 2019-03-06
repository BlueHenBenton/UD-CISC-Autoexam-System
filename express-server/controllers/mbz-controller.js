const awaitTemp = require('../utilities/await-temp');
const fs = require('fs-extra'); // like node's 'fs', but with more methods and *promise support*.
const del = require('del');
const extractMbz = require('../utilities/extract-mbz');
const parseMetaFromTags = require('../utilities/parse-meta-from-tags');

async function parseAndSaveMbz(req, res) {
  const dir = await awaitTemp.mkdir();
  await fs.writeFile(dir + '/upload.mbz', req.body);
  await extractMbz(dir + '/upload.mbz', dir + '/extracted');
  const questions = await fs.readdir(dir + '/extracted/activities');
  const questionMetaPromises = questions.map(async (question) => {
    return {
      path: question,
      ...(await parseMetaFromTags(dir + `/extracted/activities/${question}`))
    };
  });
  const questionMetas = await Promise.all(questionMetaPromises);
  await del(dir, { force: true });
  res.send(questionMetas);
}

module.exports = {
  parseAndSaveMbz
}
