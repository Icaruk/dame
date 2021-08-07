
module.exports = function raceTimeout(promise, options, dameInstance) {
	
	let timeout;
	
	if (dameInstance.timeout) timeout = dameInstance.timeout;
	if (options.timeout) timeout = options.timeout;
	
	
	
	if (timeout) {
		return Promise.race([
			new Promise( resolve => {
				setTimeout(
					() => resolve({
						isError: true,
						code: 0,
						status: 'Timed out',
						response: null,
					}),
					timeout
				);
			}),
			promise,
		])
	} else {
		return promise;
	};
	
};