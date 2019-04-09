const awaitTemp = require('../utilities/await-temp');
const fs = require('fs-extra'); // like node's 'fs', but with more methods and *promise support*.
const del = require('del');
const config = require('../utilities/config');
const extractMbz = require('../utilities/extract-mbz');
const parseMetaFromTags = require('../utilities/parse-meta-from-tags');
const parseCourse = require('../utilities/parse-course');
const tarQuestion = require('../utilities/tar-question');
const encodeQuestion = require('../utilities/encode-question');

async function parseAndSaveMbz(req, res) {
  // Create a temporary directory
  const dir = await awaitTemp.mkdir();
  // Put the mbz in that directory
  await fs.writeFile(dir + '/upload.mbz', req.body);
  // Extract the mbz
  await extractMbz(dir + '/upload.mbz', dir + '/extracted');
  // What questions are here?
  const questions = await fs.readdir(dir + '/extracted/activities');
  /*
  // Create an array of promises that all result in question metadata
  const questionMetaPromises = questions.map(async (question) => {
    // Tar this question and put it in the permanent storage
    await tarQuestion(`${dir}/extracted/activities/${question}`, config.saveDirectory + '/activities');

    return {
      path: question,
      ...(await parseMetaFromTags(`${dir}/extracted/activities/${question}`)),
      tarpath: `storage/activities/${question}.tar.gz`
    };
  });
  // Await all of those promises
  const questionMetas = await Promise.all(questionMetaPromises);
  // Parse the course metadata
  const courseMeta = await parseCourse(`${dir}/extracted`);
  // Formulate the response
  const response = {
    questions: questionMetas,
    course: courseMeta,
  };
  // Remove the temporary directory
  await del(dir, { force: true });
  // Send the response
  res.send(response);
  */

  // Get an array of promises to question data
  const questionDataPromises = questions.map(question => encodeQuestion((`${dir}/extracted/activities/${question}`)));
  // Await all the promises to actually get the question data. This runs them all in parallel.
  const questionData = await Promise.all(questionDataPromises);
  // Remove the temporary directory
  await del(dir, { force: true });
  // Return the question data
  res.json(questionData);
}

module.exports = {
  parseAndSaveMbz
}
