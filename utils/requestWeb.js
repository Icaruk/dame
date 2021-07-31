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
			error: null,
		};
		
		
		
		return new Promise( async resolve => {
			
			try {
				
				const options = {
					method: method,
					headers: headers,
				};
				if (method !== "GET") options.body = body;
				
				
				let response = await fetch(fullUrl, options);
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
				
				
				const is200 = response.status >= 200 && response.status < 300;
				
				
				resolve({
					isError: !is200,
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
	