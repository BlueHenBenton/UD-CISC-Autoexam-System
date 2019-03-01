const fs = require('fs');
const xml2js = require('xml2js');

function parseXmlStringAsync(string) {
  return new Promise((resolve, reject) => {
    (new xml2js.Parser()).parseString(string, (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
}

function fsReadAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
}

function findExactlyOneStartingWith(arr, start) {
  const filtered = arr.filter(x => x.startsWith(start));
  if (filtered.length === 0) throw new Error(`Could not find any tags starting with '${start.toString()}'`);
  if (filtered.length > 1) throw new Error(`Found multiple tags starting with '${start.toString()}'`);
  return filtered[0].substring(start.length);
}

async function parseTags(pathToQuestion) {
  const xml = await parseXmlStringAsync(await fsReadAsync(pathToQuestion + '/module.xml'));
  if(!xml) throw new Error('Failed to parse xml.');
  if(!xml.module) throw new Error('XML root element isn\'t <module>.');
  if(!xml.module.tags) throw new Error('Cannot find any \'tags\' element in <module>.');
  if(xml.module.tags.length !== 1) throw new Error('Found multiple \'tags\' elements in <module>.');
  if(!xml.module.tags[0].tag) return [];
  return xml.module.tags[0].tag.map(tagxml => {
    if(!tagxml.$ || !tagxml.$.id) throw new Error('Cannot find id attribute on tag.');
    const id = Number(tagxml.$.id);
    if(isNaN(id)) throw new Error(`Cannot parse number from tag id: ${tagxml.$.id}`);

    if(!tagxml.name || tagxml.name.length !== 1) throw new Error(`Cannot find exactly one name on tag ${id}`);
    const name = tagxml.name[0];
    if(typeof name !== 'string') throw new Error(`Tag name is not a simple string on tag ${id}.`);

    if(!tagxml.rawname || tagxml.rawname.length !== 1) throw new Error(`Cannot find exactly one rawname on tag ${id}`);
    const rawname = tagxml.rawname[0];
    if(typeof rawname !== 'string') throw new Error(`Tag rawname is not a simple string on tag ${id}.`);

    return { id, name, rawname };
  })
}

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
