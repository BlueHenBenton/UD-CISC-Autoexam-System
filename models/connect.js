// This file, when imported, connects mongoose to mongodb according to values in the config file.
// It does not export anything.

const mongoose = require('mongoose');
const config = require('../utilities/config.js');

mongoose.connect(config.connectionString, { useNewUrlParser: true });