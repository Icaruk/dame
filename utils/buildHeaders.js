
module.exports = function buildHeaders(config, dameInstance = {}) {
	
	const configHeaders = config.headers;
	const dameInstanceHeaders = dameInstance.headers;
	
	const configHeadersOk = configHeaders && Object.keys(configHeaders).length > 0;
	const dameInstanceHeadersOk = dameInstanceHeaders && Object.keys(dameInstanceHeaders).length > 0;
	
	if (configHeadersOk && dameInstanceHeadersOk) return {...dameInstanceHeaders, ...configHeaders};
	if (configHeadersOk) return configHeaders;
	if (dameInstanceHeadersOk) return dameInstanceHeaders;
	
	return {};
	
};