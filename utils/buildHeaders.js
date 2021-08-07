
module.exports = function buildHeaders(config, dameInstance = {}) {
	
	const optionHeaders = config.headers;
	const dameInstanceHeaders = dameInstance.headers;
	
	if (optionHeaders && dameInstanceHeaders) return {...dameInstanceHeaders, ...optionHeaders};
	if (optionHeaders) return optionHeaders;
	if (dameInstanceHeaders) return dameInstanceHeaders;
	
	return {};
	
};