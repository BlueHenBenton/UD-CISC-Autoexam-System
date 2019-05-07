const MakeCrudFromMongoSchema = require('../utilities/make-crud-from-mongo-schema');
const { Tag } = require('../models');

/** A helper that can make standard crud operations on the Tag collection */
const crudCreator = MakeCrudFromMongoSchema('tag', Tag, 'name');

/** Everything available to whoever imports this module: all crud operations. */
module.exports = {
    getTags: crudCreator.makeList(),
    getTag: crudCreator.makeRead('tagname'),
    postTag: crudCreator.makeCreate(),
    putTag: crudCreator.makeUpdate('tagname'),
    deleteTag: crudCreator.makeDelete('tagname')
};