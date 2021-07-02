
module.exports = function buildHeaders(headers, config = {}) {
	
	const configHeaders = config.headers;
	
	if (headers && configHeaders) return {...configHeaders, ...headers};
	return configHeaders;
	
};