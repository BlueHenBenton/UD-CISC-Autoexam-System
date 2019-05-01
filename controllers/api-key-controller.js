const MakeCrudFromMongoSchema = require('../utilities/make-crud-from-mongo-schema');
const { ApiKey } = require('../models');

const crudCreator = MakeCrudFromMongoSchema('API key', ApiKey, 'key');

async function createKey(req, res) {
    const obj = new ApiKey();
    obj.key = "";

    const randomChar = () => {
        // Create [0-9A-Za-z]
        let ret = Math.floor(Math.random() * 62) + 48;
        if (ret <= 57) return String.fromCharCode(ret);
        ret += 7;
        if (ret <= 90) return String.fromCharCode(ret);
        ret += 6;
        if (ret <= 122) return String.fromCharCode(ret);
        throw new Error(`Shouldn't ever get here...`);
    }
    for(let i=0; i<12; i++) {
        obj.key += randomChar();
    }
    await obj.save();
    res.status(201).send({ key: obj.key });
}

const standardDelete = crudCreator.makeDelete('key');
async function augmentedDelete(req, res) {
    if (req.ApiKey === req.params.key) return res.status(409).send(`You can't delete the key you're using.`);
    return await standardDelete(req, res);
}

module.exports = {
    getKeys: crudCreator.makeList(),
    createKey: createKey,
    deleteKey: augmentedDelete
}