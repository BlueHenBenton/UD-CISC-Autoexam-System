const parseTags = require('./parse-tags');
const Tag = require('../models/tag');

module.exports = async function(question) {
    const actualTags = (await parseTags(question)).map(
        data => ({
            name: data.name.substr(0, data.name.indexOf(': ')),
            value: data.name.substr(data.name.indexOf(': ') + 2)
        })
    );
    
    // Load tags from database
    const expectedTags = await Tag.find();
    
    // Make sure every tag in the document is in the database.
    actualTags.forEach(actual => {
        if (expectedTags.find(expected => expected.name === actual.name) === undefined) {
            console.warn(`Warning: unknown tag: "${actual.name}"`);
        }
    });

    // Make sure every required tag is in the document.
    expectedTags.filter(expected => expected.required).forEach(expected => {
        if (actualTags.find(actual => actual.name === expected.name) === undefined) {
            console.warn(`Warning: missing tag: "${expected.name}"`);
        }
    });

    // Make sure tag has a valid value
    actualTags.forEach(actual => {
        const tag = expectedTags.find(expected => expected.name === actual.name);
        if(tag && tag.enum){
            if(!tag.enum.includes(actual.value)){
                console.warn(`Warning: invalid value for tag: "${actual.name}"`);
            }
        }
    });
}