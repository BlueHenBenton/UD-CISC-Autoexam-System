const express = require('express');
const router = require('./router');

const port = 2468;

const app = express();
router(app);
app.listen(port);

console.log(`Listening on ${port}...`);
