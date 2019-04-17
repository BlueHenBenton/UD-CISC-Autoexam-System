function sanitizeKey(key) {
    return key.replace(/\\/g, '\\b').replace(/\./g, '\\d').replace(/\$/g, '\\D');
}

function desanitizeKey(key) {
    return key.replace(/\\D/g, '$').replace(/\\d/g, '.').replace(/\\b/g, '\\');
}

function sanitizeObject(object) {
    if (object instanceof Array) return object.map(subobject => sanitizeObject(subobject));
    if (typeof object !== 'object') return object;

    const ret = {};
    for (const entry of Object.entries(object)) {
        ret[sanitizeKey(entry[0])] = sanitizeObject(entry[1]);
    }
    return ret;
}

function desanitizeObject(object) {
    if (object instanceof Array) return object;
    if (typeof object !== 'object') return object;

    const ret = {};
    for (const entry of Object.entries(object)) {
        ret[desanitizeKey(entry[0])] = desanitizeObject(entry[1]);
    }
    return ret;
}

module.exports = {
    sanitizeKey,
    desanitizeKey,
    sanitizeObject,
    desanitizeObject
};
