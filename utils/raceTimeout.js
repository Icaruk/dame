
const buildTimeout = require("./buildTimeout");


module.exports = function raceTimeout(promise, options, dameInstance) {
	
	let timeout = buildTimeout(options, dameInstance);
	
	
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