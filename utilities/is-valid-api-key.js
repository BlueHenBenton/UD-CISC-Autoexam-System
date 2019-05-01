const config = require('./config');

async function isValidApiKey(key) {
    if (key === config.superuserApiKey) return true;

    return false;
}

module.exports = isValidApiKey;