const { Tag } = require('../models');

async function getTags(req, res) {
    const result = await Tag.find({}, { name: true });
    res.json(result.map(doc => doc.name));
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
    const tag = await Tag.findOne({ name: req.params.tagname });
    if(!tag) return res.status(404).send('A tag with that name cannot be found.');

    try {
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

async function deleteTag(req, res) {
    const tag = await Tag.findOne({ name: req.params.tagname });
    if(!tag) return res.status(404).send('A tag with that name cannot be found.');

    await tag.delete();

    res.status(204).send();
}

module.exports = { getTags, getTag, postTag, putTag, deleteTag };