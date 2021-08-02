
module.exports = function buildHeaders(headers, config = {}) {
	
	const configHeaders = config.headers;
	
	if (headers && configHeaders) return {...configHeaders, ...headers};
	if (configHeaders) return configHeaders;
	
	
	return headers;
	
};