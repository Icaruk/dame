// const canReachGoogle = require("./canReachGoogle");



/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} headers
 * @property {*} body
*/

/**
 * @typedef Response
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/

/**
 * @param {Options}
 * @returns {Promise<Response>}
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
	
	
	
	return new Promise( async resolve => {
		
		try {
			
			const options = {
				method: method,
			};
			if (method !== "GET") options.body = body;
			
			
			let res = await fetch(fullUrl, options);
			let json = await res.json();
			
			
			resolve({
				isError: false,
				code: res.status,
				status: res.statusText,
				response: json,
			});
			
			
		} catch (err) {
			
			resolve({
				isError: true,
				code: -999,
				status: "Exception",
				response: null,
				error: err,
			});
		};
		
	});
	
};
