const config = require('./config');
const ApiKey = require('../models/api-key');

async function isValidApiKey(key) {
    if (key === config.superuserApiKey) return true;

    return (await ApiKey.findOne({ key: key })) !== null;
}

module.exports = isValidApiKey;