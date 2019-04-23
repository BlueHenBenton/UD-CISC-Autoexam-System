const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { MbzController, TagController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), asyncHandler(MbzController.parseAndSaveMbz));
  app.get('/tags', asyncHandler(TagController.getTags));
  app.post('/tags', asyncHandler(TagController.postTag));
  app.get('/tag/:tagname', asyncHandler(TagController.getTag));
  app.put('/tag/:tagname', asyncHandler(TagController.putTag));
  app.delete('/tag/:tagname', asyncHandler(TagController.deleteTag));
}
