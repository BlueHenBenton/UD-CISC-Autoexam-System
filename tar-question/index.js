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

// CLI: Not necessary, but convenient for now.
if (process.argv.length < 3 || process.argv.length > 4) {
  console.log('Please provide 1-2 arguments.');
  return;
}

tarQuestion(process.argv[2], process.argv[3] || 'out').then(path => console.log(`Created ${path}`));
