
module.exports = function checkIsError(code) {
	if (!code) return true;
	return !(code >= 200 && code < 300);
};