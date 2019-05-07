// Make sure we connect if this file gets imported
require('./connect.js');
const mongoose = require('mongoose');
const config = require('../utilities/config');

module.exports = mongoose.model(config.tagsCollection, new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    required: {
        type: Boolean,
        required: true
    },
    allowMulti: {
        type: Boolean,
        required: true
    },
    enum: {
        type: [String],
        default: undefined
    }
}));
