
module.exports = function buildUrl(base, path) {
    
	if (path.startsWith("http")) return path;
	if (!base) return path;
	
    return base + path;
	
};