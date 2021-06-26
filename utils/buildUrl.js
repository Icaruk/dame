
module.exports = function buildUrl(url, config = {}) {
	
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	
	const configBaseUrl = config.baseUrl;
	if (configBaseUrl) return configBaseUrl + url;
	
	return url;
	
};