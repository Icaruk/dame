
module.exports = function buildUrl(base, path) {
    
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	if (!base) return path;
	
    return base + path;
	
};