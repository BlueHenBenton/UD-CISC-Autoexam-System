const fs = require('fs-extra');
const xml2js = require('xml2js');

function encode(str) {
    return new Promise((resolve, reject) => {
        (new xml2js.Parser()).parseString(str, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = async function encodeQuestion(dir) {
    // What files are there?
    const files = await fs.readdir(dir);
    // Set up an object to contain out return.
    const ret = {};
    // Asynchronously run a function for each file.
    await Promise.all(files.map(async (file) => {
        const path = dir + '/' + file;
        // If it's a file...
        if ((await fs.stat(path)).isFile()) {
            // Put the right thing in the ret object.
            if (file.endsWith('.xml'))
                ret[file] = await encode(await fs.readFile(path));
            else
                ret[file] = await fs.readFile(path);
        } else {
            console.warn(`Warning: ignoring directory ${file} in ${dir}.`);
        }
    }));
    // All the promises are done. We can return.
    return ret;
}
