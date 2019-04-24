const { Tag } = require('../models');

async function getTags(req, res) {
    res.status(500).send('Not implemented.');
}

async function getTag(req, res) {
    res.status(500).send('Not implemented.');
}

async function postTag(req, res) {
    const body = req.body;
    // Validate body
    if (typeof body !== 'object') return res.status(400).send('Missing body.');
    if (typeof body.name !== 'string') return res.status(400).send('.name must be a string.');
    if (typeof body.required !== 'boolean') return res.status(400).send('.required must be a boolean.');
    if (typeof body.allowMulti !== 'boolean') return res.status(400).send('.allowMulti must be a boolean.');
    if (body.enum !== undefined && !(body.enum instanceof Array)) return res.status(400).send('.enum must be undefined or an array.');
    if (body.enum) {
        for (const elm of body.enum) {
            if (typeof elm !== 'string') return res.status(400).send('.enum must only contain strings.');
        }
    }

    // It's valid. Make sure a tag with that name doesn't exist.
    if((await Tag.find({ name: body.name }).exec()).length > 0) {
        return res.status(400).send('A tag with that name already exists.');
    }

    // It doesn't exist, add the tag.
    const tag = new Tag();
    tag.name = body.name;
    tag.required = body.required;
    tag.allowMulti = body.allowMulti;
    tag.enum = body.enum;
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