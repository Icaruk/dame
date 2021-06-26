
module.exports = function buildHeaders(base = {}, headers = {}) {
    if (!base) return headers;
    return {
		...base,
		headers
	};
};