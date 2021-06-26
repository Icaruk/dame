
module.exports = function buildHeaders(headers, config = {}) {
	
	if (headers) return headers;
	
	const configHeaders = config && config.default && config.default.headers;
	return configHeaders;
	
};