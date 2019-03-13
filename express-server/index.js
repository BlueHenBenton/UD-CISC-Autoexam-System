#!/usr/bin/env node

const fs = require('fs');
if(!fs.existsSync('/etc/autoexam/config.json')) {
  console.error('Cannot find config.json. If you don\'t have it, create it by copying config-template.json and changing the values.');
  console.error('Aborting.');
  process.exit(1);
}

const express = require('express');
const router = require('./router');

const config = require('./config.json');

const port = config.port;

const app = express();
router(app);
app.listen(port);

console.log(`Listening on ${port}...`);
