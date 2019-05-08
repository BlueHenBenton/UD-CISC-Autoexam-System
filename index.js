#!/usr/bin/env node

// This is the entrypoint file: start the server

const express = require('express');
const router = require('./router');
const config = require('./utilities/config');
const port = config.port;

// Create the app
const app = express();
// Add routing to the app
router(app);
// Start the app
app.listen(port);
// Tell the user it's running
console.log(`Listening on ${port}...`);
