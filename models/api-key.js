require('./connect.js');
const mongoose = require('mongoose');
const config = require('../utilities/config');

module.exports = mongoose.model(config.apiKeysCollection, new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    }
}));
