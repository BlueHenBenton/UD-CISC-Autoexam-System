#!/usr/bin/env node

const express = require('express');
const router = require('./router');

const config = require('./utilities/config');

const port = config.port;

const app = express();
router(app);
app.listen(port);

console.log(`Listening on ${port}...`);
