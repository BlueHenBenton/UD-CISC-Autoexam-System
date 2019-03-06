const cors = require('cors');
const bodyParser = require('body-parser');
const { TestController, MbzController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.get('/test', TestController.test);
  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), MbzController.parseAndSaveMbz);
}
