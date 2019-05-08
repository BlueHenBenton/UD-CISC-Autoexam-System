const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const isValidApiKey = require('./utilities/is-valid-api-key');
const { MbzController, TagController, ApiKeyController } = require('./controllers');

/** A function that adds routing to the given app */
module.exports = function(app) {
  app.use(cors());
  // Add API-key restriction to *all* endpoints
  app.use(asyncHandler(async (req, res, next) => {
    const prefix = 'Api-Key ';
    const authorization = req.headers.authorization;
    if (authorization === undefined) return res.status(403).send(`Provide header: "Authorization: ${prefix}..."`);
    if (!authorization.startsWith(prefix)) return res.status(403).send(`Use ${prefix}for authorization.`);
    req.apiKey = authorization.substr(prefix.length);
    if (!(await isValidApiKey(req.apiKey))) return res.status(403).send(`Api-Key "${req.apiKey}" not recognized.`);
    next();
  }));

  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), asyncHandler(MbzController.parseAndSaveMbz));
  app.get('/tags', asyncHandler(TagController.getTags));
  app.post('/tags', bodyParser.json(), asyncHandler(TagController.postTag));
  app.get('/tags/:tagname', asyncHandler(TagController.getTag));
  app.put('/tags/:tagname', bodyParser.json(), asyncHandler(TagController.putTag));
  app.delete('/tags/:tagname', asyncHandler(TagController.deleteTag));
  app.get('/api-keys', asyncHandler(ApiKeyController.getKeys));
  app.post('/api-keys', asyncHandler(ApiKeyController.createKey));
  app.delete('/api-keys/:key', asyncHandler(ApiKeyController.deleteKey));
}
