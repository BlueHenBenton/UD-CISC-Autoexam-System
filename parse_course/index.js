const fs = require('fs'); // This is a library built-in to node for interacting with the filesystem.
const xml2js = require('xml2js'); // This is a library installed from npm.

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


/** Consumes the path to an question (activity), produces the tags of that question (activity).
 * Note: this is an async/await function. For info on how that works, see here: https://javascript.info/async-await
 */
async function parseTags(pathToQuestion) {
  // Read the file into a string and parse it.
  const xml = await parseXmlStringAsync(await fsReadAsync(pathToQuestion + '/course.xml'));
  //console.log(xml.course.fullname[0]);
  // Make sure we can find out tags.
  if(!xml) throw new Error('Failed to parse xml.');
  if(!xml.course) throw new Error('XML root element isn\'t <module>.');
  if(!xml.course.$.id) throw new Error('Cannot find course id in <module>.');
  if(!xml.course.fullname[0]) throw new Error('Cannot find course name in <module>.');
  
  //Get id
  const id = xml.course.$.id;
  // full name
  const name = xml.course.fullname[0];
  // Course name
  const coursename = name.substr(0, 7);
  return { course_id: id, course_name:coursename };
}


// CLI: Useful for testing for now, not necessary in the future.

if(process.argv.length != 3) {
  console.error('Please provide exactly 1 argument.');
  process.exit(1);
}
parseTags(process.argv[2]).then(tags => console.dir(tags));
