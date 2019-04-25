const fs = require('fs'); // This is a library built-in to node for interacting with the filesystem.
const xml2js = require('xml2js'); // This is a library installed from npm.
const tag_access = require('../express-server/controllers');

/** Consumes an xml string, produces a Promise of its content.
 * For info on Promises, see here: https://javascript.info/promise-basics
 */
async function parseXmlStringAsync(string) {
  return new Promise((resolve, reject) => {
    (new xml2js.Parser()).parseString(string, (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
}

/** Does the same thing as fs.readFile, but converts the call to a Promise because I like that better.
 * For info on how fs.readFile works, see here: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 */
async function fsReadAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
}

/** Consumes an array of strings and a string.
 * If no strings in the array start with the given string, it errors.
 * If multiple strings in the array start with the given string, it errors.
 * It returns the one matching string, with the given string removed from its start.
 */
function findExactlyOneStartingWith(arr, start) {
  const filtered = arr.filter(x => x.startsWith(start));
  if (filtered.length === 0) throw new Error(`Could not find any tags starting with '${start.toString()}'`);
  if (filtered.length > 1) throw new Error(`Found multiple tags starting with '${start.toString()}'`);
  return filtered[0].substring(start.length);
}

/** Consumes the path to an question (activity), produces the tags of that question (activity).
 * Note: this is an async/await function. For info on how that works, see here: https://javascript.info/async-await
 */
async function parseTags(pathToQuestion) {
  // Read the file into a string and parse it.
  const xml = await parseXmlStringAsync(await fsReadAsync(pathToQuestion + '/module.xml'));
  // Make sure we can find out tags.
  if(!xml) throw new Error('Failed to parse xml.');
  if(!xml.module) throw new Error('XML root element isn\'t <module>.');
  if(!xml.module.tags) throw new Error('Cannot find any \'tags\' element in <module>.');
  if(xml.module.tags.length !== 1) throw new Error('Found multiple \'tags\' elements in <module>.');
  if(!xml.module.tags[0].tag) return []; // No tags are specified, so it didn't even put the property here.

  // We've found tags. Map them to a better format and return.
  return xml.module.tags[0].tag.map(tagxml => {
    // Id
    if(!tagxml.$ || !tagxml.$.id) throw new Error('Cannot find id attribute on tag.');
    const id = Number(tagxml.$.id);
    if(isNaN(id)) throw new Error(`Cannot parse number from tag id: ${tagxml.$.id}`);

    // Name
    if(!tagxml.name || tagxml.name.length !== 1) throw new Error(`Cannot find exactly one name on tag ${id}`);
    const name = tagxml.name[0];
    if(typeof name !== 'string') throw new Error(`Tag name is not a simple string on tag ${id}.`);

    // Rawname
    if(!tagxml.rawname || tagxml.rawname.length !== 1) throw new Error(`Cannot find exactly one rawname on tag ${id}`);
    const rawname = tagxml.rawname[0];
    if(typeof rawname !== 'string') throw new Error(`Tag rawname is not a simple string on tag ${id}.`);

    tag_access.getTags();

    return { id, name, rawname };
  });
}

/** Given a path to a question (activity), find the language, cognitive legel,
 * difficulty, and skill slos from it's tags.
 */
async function getTagMetadata(pathToQuestion) {
  const tagnames = (await parseTags(pathToQuestion)).map(tag => tag.name);
  return {
    language: findExactlyOneStartingWith(tagnames, 'es language: '),
    cognitiveLevel: findExactlyOneStartingWith(tagnames, 'es cognitive level: '),
    difficulty: findExactlyOneStartingWith(tagnames, 'es difficulty: '),
    skillSlo: tagnames
      .filter(tag => tag.startsWith('es slo: '))
      .map(tag => tag.substring(8))
  };
}

// CLI: Useful for testing for now, not necessary in the future.

if(process.argv.length != 3) {
  console.error('Please provide exactly 1 argument.');
  process.exit(1);
}
getTagMetadata(process.argv[2]).then(tags => console.dir(tags));
