
module.exports = function buildMaxRedirects(config, instance) {
	
	if (config.maxRedirects !== null && config.maxRedirects !== undefined) {
		return config.maxRedirects;
	} else {
		return  instance.maxRedirects;
	};
	
};