
module.exports = function checkIsError(code, options, config = {}) {
	
	if (!code) return true;
	
	if (options.checkIsError) return options.checkIsError(code);
	if (config.checkIsError) return config.checkIsError(code);
	
	return !(code >= 200 && code < 300);
	
};