const tar = require('tar');
const mkdirp = require('mkdirp');

module.exports = async function (questionPath, outDir) {
  const splitPath = questionPath.split('/');
  const name = splitPath[splitPath.length - 1];
  const outFile = outDir + '/' + name + '.tar.gz';

  console.log(outDir);

  // Make the folder if it doesn't exist
  await new Promise((resolve, reject) => {
    mkdirp(outDir, (err, made) => {
      if (err) reject(err);
      else resolve(made);
    });
  });

  // Create the archive 
  await tar.c(
    {
      gzip: true,
      file: outFile,
      cwd: splitPath.filter((x, i) => i < splitPath.length - 1).join('/')
    },
    [name]
  );

  return outFile;
}
