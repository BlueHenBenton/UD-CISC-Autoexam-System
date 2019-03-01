const tar = require('tar');
const mkdirp = require('mkdirp');

async function tarQuestion(questionPath, outDir) {
  const splitPath = questionPath.split('/');
  const name = splitPath[splitPath.length - 1];
  const outFile = outDir + '/' + name + '.tar.gz';

  // Make the folder if it doesn't exist
  mkdirp(outDir, err => {
    if (err) throw err;
  });

  // Create the archive 
  await tar.c(
    {
      gzip: true,
      file: outFile
    },
    [questionPath]
  );

  return outFile;
}

tarQuestion('./sample-question', 'out').then(path => console.log(`Created ${path}`));
