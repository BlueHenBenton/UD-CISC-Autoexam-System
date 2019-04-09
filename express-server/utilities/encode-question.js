const fs = require('fs');
const xml2json = require('xml2json');

module.exports = async function encodeQuestion(dir) {
    return {
        'grade_history.xml': xml2json.toJson(fs.readFileSync(`${dir}/grade_history.xml`).toString(), { object: true, reversible: true }),
        'grades.xml': xml2json.toJson(fs.readFileSync(`${dir}/grades.xml`).toString(), { object: true, reversible: true }),
        'inforef.xml': xml2json.toJson(fs.readFileSync(`${dir}/inforef.xml`).toString(), { object: true, reversible: true }),
        'module.xml': xml2json.toJson(fs.readFileSync(`${dir}/module.xml`).toString(), { object: true, reversible: true }),
        'roles.xml': xml2json.toJson(fs.readFileSync(`${dir}/roles.xml`).toString(), { object: true, reversible: true }),
        'vpl.xml': xml2json.toJson(fs.readFileSync(`${dir}/vpl.xml`).toString(), { object: true, reversible: true })
    }
}