// This file, when imported, connects mongoose to mongodb according to values in the config file.
// It does not export anything.

const mongoose = require('mongoose');
const config = require('../utilities/config.js');

const url = `mongodb://localhost:27017/${config.dbName}`;

mongoose.connect(url, { useNewUrlParser: true });