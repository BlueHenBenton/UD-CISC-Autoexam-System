const cors = require('cors');
const bodyParser = require('body-parser');
const { MbzController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.post('/mbz', bodyParser.raw({ type: () => true, limit: '15MB' }), MbzController.parseAndSaveMbz);
}
