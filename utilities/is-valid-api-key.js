const config = require('./config');
const ApiKey = require('../models/api-key');

/** Returns `true` if the given API key should be accepted, and `false` if it should not. */
async function isValidApiKey(key) {
    if (key === config.superuserApiKey) return true;

    return (await ApiKey.findOne({ key: key })) !== null;
}

module.exports = isValidApiKey;