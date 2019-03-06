const { TestController } = require('./controllers');

module.exports = function(app) {
  app.get('/test', TestController.test)
}
