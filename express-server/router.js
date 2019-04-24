const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { MbzController, TagController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), asyncHandler(MbzController.parseAndSaveMbz));
  app.get('/tags', asyncHandler(TagController.getTags));
  app.post('/tags', bodyParser.json(), asyncHandler(TagController.postTag));
  app.get('/tags/:tagname', asyncHandler(TagController.getTag));
  app.put('/tags/:tagname', asyncHandler(TagController.putTag));
  app.delete('/tags/:tagname', asyncHandler(TagController.deleteTag));
}
