/** Given a string, escape all '.' and '$' symbols in such a way that `desanitizekey(...)` can decode the original string. */
function sanitizeKey(key) {
    return key.replace(/\\/g, '\\b').replace(/\./g, '\\d').replace(/\$/g, '\\D');
}

/** Given a string encoded by `sanitizeKey(...)`, return the original string. */
function desanitizeKey(key) {
    return key.replace(/\\D/g, '$').replace(/\\d/g, '.').replace(/\\b/g, '\\');
}

/** Given an object, return an object such that no key contains a '.' or a '$', and `desanitizeObject(...)` can return a clone of the original object. */
function sanitizeObject(object) {
    if (object instanceof Array) return object.map(subobject => sanitizeObject(subobject));
    if (typeof object !== 'object') return object;

    const ret = {};
    for (const entry of Object.entries(object)) {
        ret[sanitizeKey(entry[0])] = sanitizeObject(entry[1]);
    }
    return ret;
}

/** Given an object encoded by `sanitizeObject(...)`, return an object equivalent to the original object. */
function desanitizeObject(object) {
    if (object instanceof Array) return object;
    if (typeof object !== 'object') return object;

    const ret = {};
    for (const entry of Object.entries(object)) {
        ret[desanitizeKey(entry[0])] = desanitizeObject(entry[1]);
    }
    return ret;
}

// Export the functions
module.exports = {
    sanitizeKey,
    desanitizeKey,
    sanitizeObject,
    desanitizeObject
};
