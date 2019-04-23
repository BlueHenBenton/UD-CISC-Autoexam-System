const { Tag } = require('../models');

async function getTags(req, res) {
    res.status(500).send('Not implemented.');
}

async function getTag(req, res) {
    res.status(500).send('Not implemented.');
}

async function postTag(req, res) {
    const tag = new Tag();
    tag.name = 'Test';
    tag.required = true;
    tag.allowMulti = false;
    await tag.save();
    res.send('Ok');
}

async function putTag(req, res) {
    res.status(500).send('Not implemented.');
}

async function deleteTag(req, res) {
    res.status(500).send('Not implemented.');
}

module.exports = { getTags, getTag, postTag, putTag, deleteTag };