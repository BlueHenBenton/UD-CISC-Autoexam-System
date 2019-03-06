const cors = require('cors');
const { TestController } = require('./controllers');

module.exports = function(app) {
  app.use(cors());
  app.get('/test', TestController.test)
}
