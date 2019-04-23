require('./connect.js');
const mongoose = require('mongoose');

module.exports = mongoose.model('tags', new mongoose.Schema({
    name: {
        type: String,
        required: true
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
