
module.exports = function raceTimeout(promise, timeout, config = {}) {
	
	// Timeout
	let _timeout = timeout;
	if (!_timeout && config.timeout) _timeout = config.timeout;
	
	
	if (_timeout) {
		return Promise.race([
			new Promise( resolve => {
				setTimeout(
					() => resolve({
						isError: true,
						code: 0,
						status: 'Timed out',
						response: null,
					}),
					_timeout
				);
			}),
			promise,
		])
	} else {
		return promise;
	};
	
};