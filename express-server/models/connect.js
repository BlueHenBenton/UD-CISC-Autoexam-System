const mongoose = require('mongoose');
const config = require('../utilities/config.js');

const url = `mongodb://localhost:27017/${config.dbName}`;

mongoose.connect(url, { useNewUrlParser: true });