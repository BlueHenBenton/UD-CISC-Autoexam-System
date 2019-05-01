const MakeCrudFromMongoSchema = require('../utilities/make-crud-from-mongo-schema');
const { Tag } = require('../models');

const crudCreator = MakeCrudFromMongoSchema('tag', Tag, 'name');

module.exports = {
    getTags: crudCreator.makeList(),
    getTag: crudCreator.makeRead('tagname'),
    postTag: crudCreator.makeCreate(),
    putTag: crudCreator.makeUpdate('tagname'),
    deleteTag: crudCreator.makeDelete('tagname')
};