// const canReachGoogle = require("./canReachGoogle");



/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} headers
 * @property {*} body
*/

/**
 * @typedef ResponseWeb
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/

/**
 * @param {Options}
 * @returns {Promise<ResponseWeb>}
*/
module.exports = function requestWeb({
// function requestWeb({
	method,
	fullUrl,
	headers,
	body,
}) {
	
	if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
		return console.log(`Method ${method} is not valid.`)
	};
	
	
	if (!window.navigator.onLine) return {
		isError: true,
		code: -2,
		status: "No internet connection",
		response: null,
		error: err,
	};
	
	
	
	return new Promise( async resolve => {
		
		try {
			
			const options = {
				method: method,
				headers: headers,
			};
			if (method !== "GET") options.body = body;
			
			
			let res = await fetch(fullUrl, options);
			let json = await res.json();
			
			
			const is200 = res.status >= 200 && res.status < 300;
			
			
			resolve({
				isError: !is200,
				code: res.status,
				status: res.statusText,
				response: json,
			});
			
		} catch (err) {
			
			resolve({
				isError: true,
				code: -1,
				status: "No response from server",
				response: null,
				error: err,
			});
			
			// resolve({
			// 	isError: true,
			// 	code: -999,
			// 	status: "Exception",
			// 	response: null,
			// 	error: err,
			// });
		};
		
	});
	
};
