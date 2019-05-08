const parseTags = require('./parse-tags');
const Tag = require('../models/tag');

/** Look at the tags in the given question, and validate them against the rules in the db. */
module.exports = async function(question) {
    // Parse the tags from the question
    const actualTags = (await parseTags(question)).map(
        // Split them by ': ' into name and value.
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
                console.warn(`Warning: invalid value "${actual.value}" for tag: "${actual.name}"`);
            }
        }
    });
    
    // Check for duplicate tags for certain types of tags
    let count = 0;
    expectedTags.filter(expected => !expected.allowMulti).forEach(expected => {
        if (actualTags.filter(actual => actual.name === expected.name).length > 1){
              console.warn(`Warning: duplicate tag: "${expected.name}"`);
        }
    });
}
