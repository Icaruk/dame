const checkIsError = require("./checkIsError");
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
	method,
	fullUrl,
	headers,
	body,
	options,
	config,
}) {
	
	if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
		return {
			isError: true,
			code: -999,
			status: "Error",
			response: null,
			error: `Method ${method} is not valid.`,
		};
	};
	
	
	// if (!window.navigator.onLine) return {
	// 	isError: true,
	// 	code: -2,
	// 	status: "No internet connection",
	// 	response: null,
	// 	error: null,
	// };
	
	
	
	return new Promise( async resolve => {
		
		try {
			
			const fetchOptions = {
				method: method,
				headers: headers,
			};
			if (method !== "GET") fetchOptions.body = body;
			
			
			let response = await window.fetch(fullUrl, fetchOptions);
			let data = response;
			
			
			const contentType = response.headers.get("Content-Type").split("; "); // 'application/json; charset=utf-8';
			const contentTypeLow = contentType[0].toLowerCase();
			
			
			try {
				if (contentTypeLow.startsWith("application/json")) {
					const json = await response.json();
					data = json;
				} else if (contentTypeLow.startsWith("text")) {
					data.toString();
				};
			} catch (err) {};
			
			
			
			const isError = checkIsError(response.status, options, config);
			
			
			
			resolve({
				isError: isError,
				code: response.status,
				status: response.statusText,
				response: data,
			});
			
		} catch (err) {
			
			resolve({
				isError: true,
				code: -1,
				status: "No response from server",
				response: null,
				error: err,
			});
			
		};
		
	});
	
};
	