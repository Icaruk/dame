
module.exports = function buildUrl(url, dameInstance) {
	
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	
	if (dameInstance.baseUrl) return dameInstance.baseUrl + url;
	
	return url;
	
};