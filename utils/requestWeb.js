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


			console.log('instanceof: ',err instanceof TypeError)  // true
  			console.log('message: ',err.message)               // "null has no properties"
  			console.log('name: ',err.name)                  // "TypeError"
  			console.log('fileName: ',err.fileName)              // "Scratchpad/1"
  			console.log('lineNumber: ',err.lineNumber)            // 2
  			console.log('columnNumber: ',err.columnNumber)          // 2
  			console.log('stack: ',err.stack)                 // "@Scratchpad/2:2:3\n"
			
			// error de sin internet net::ERR_INTERNET_DISCONNECTED
			// error de sin acceso al servidor net::ERR_NAME_NOT_RESOLVED,
			
			
			
			// resolve({
			// 	isError: true,
			// 	code: -1,
			// 	status: "No response from server",
			// 	response: null,
			// 	error: err,
			// });
			
			// resolve({
			// 	isError: true,
			// 	code: -2,
			// 	status: "No internet connection",
			// 	response: null,
			// 	error: err,
			// });
			
			
			
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
