const { Tag } = require('../models');

async function getTags(req, res) {
    res.status(500).send('Not implemented.');
}

async function getTag(req, res) {
    const result = await Tag.findOne({ name: req.params.tagname });
    if(!result) return res.status(404).send('A tag with that name cannot be found.');

    res.json(result);
}

async function postTag(req, res) {
    try {
        const tag = new Tag();
        Object.assign(tag, req.body);
        await tag.save();
        res.send('Ok');
    } catch(e) {
        if (e.name === "MongoError" && e.code === 11000)
            return res.status(409).send();
        else if (e.name === "ValidationError")
            return res.status(400).send(e.message.substr(e.message.indexOf(": ")+2));
        else
            throw e;
    }
}

async function putTag(req, res) {
    res.status(500).send('Not implemented.');
}

async function deleteTag(req, res) {
    res.status(500).send('Not implemented.');
}

module.exports = { getTags, getTag, postTag, putTag, deleteTag };