// This file is a barrell: it just exports other files all in one place.

const MbzController = require('./mbz-controller');
const TagController = require('./tag-controller');
const ApiKeyController = require('./api-key-controller');

/** All controllers */
module.exports = {
  MbzController,
  TagController,
  ApiKeyController
}
