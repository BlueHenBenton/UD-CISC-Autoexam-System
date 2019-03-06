const express = require('express');

const port = 2468;

const app = express();

app.get('/test', (req, res) => res.json({status: 'ok'}));

app.listen(port);

console.log(`Listening on ${port}...`);
