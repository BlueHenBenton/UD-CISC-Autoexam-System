const fs = require('fs-extra');
const xml2json = require('xml2json');

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
                ret[file] = xml2json.toJson(await fs.readFile(path), { object: true, reversible: true });
            else
                ret[file] = await fs.readFile(path);
        } else {
            console.warn(`Warning: ignoring directory ${file} in ${dir}.`);
        }
    }));
    // All the promises are done. We can return.
    return ret;
}