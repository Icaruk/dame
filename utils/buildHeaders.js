
module.exports = function buildHeaders(config, dameInstance = {}) {
	
	const configHeaders = config.headers;
	const dameInstanceHeaders = dameInstance.headers;
	
	if (configHeaders && dameInstanceHeaders) return {...dameInstanceHeaders, ...configHeaders};
	if (configHeaders) return configHeaders;
	if (dameInstanceHeaders) return dameInstanceHeaders;
	
	return {};
	
};