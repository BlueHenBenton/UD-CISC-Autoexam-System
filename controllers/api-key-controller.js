const MakeCrudFromMongoSchema = require('../utilities/make-crud-from-mongo-schema');
const { ApiKey } = require('../models');

// This will make standard CRUD operations for the ApiKey collection. We do *not* want to expose all of these.
const crudCreator = MakeCrudFromMongoSchema('API key', ApiKey, 'key');

/** Create a random key, add it to the database, and return it back to the caller through `res`. */
async function createKey(req, res) {
    // Create the obj
    const obj = new ApiKey();
    // Start the key as a empty string
    obj.key = "";

    /** Helper function to return a random alphanumeric character */
    const randomChar = () => {
        // Create a character in [0-9A-Za-z]
        let ret = Math.floor(Math.random() * 62) + 48;
        if (ret <= 57) return String.fromCharCode(ret);
        ret += 7;
        if (ret <= 90) return String.fromCharCode(ret);
        ret += 6;
        if (ret <= 122) return String.fromCharCode(ret);
        throw new Error(`Shouldn't ever get here...`);
    }

    // Add 12 random characters to the key
    for(let i=0; i<12; i++) {
        obj.key += randomChar();
    }

    // Save it to mongodb
    await obj.save();
    // Return it back to the caller
    res.status(201).send({ key: obj.key });
}

/** Get the standard crud delete function, but don't expose it. */
const standardDelete = crudCreator.makeDelete('key');

/** Delete the given key. The only difference from standard crud is that you can't delete the key you're using. */
async function augmentedDelete(req, res) {
    // If it's the key we're using, error out.
    if (req.apiKey === req.params.key) return res.status(409).send(`You can't delete the key you're using.`);
    // It's not? Okay, forward to the standard crud.
    return await standardDelete(req, res);
}

/** Everything available to whoever imports this module */
module.exports = {
    // Standard crud 'get'
    getKeys: crudCreator.makeList(),
    // Custom functions
    createKey: createKey,
    deleteKey: augmentedDelete
}