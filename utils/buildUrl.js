
module.exports = function buildUrl(base, path, ignoreBase = false) {
    if (!base) return path;
    if (ignoreBase) return path;
    return base + path;
};