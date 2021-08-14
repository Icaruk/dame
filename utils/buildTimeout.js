
module.exports = function buildTimeout(config, instance) {
	if (config.timeout) return config.timeout;
	if (instance.timeout) return instance.timeout;
	return null;
};