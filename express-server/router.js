const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { MbzController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), asyncHandler(MbzController.parseAndSaveMbz));
}
