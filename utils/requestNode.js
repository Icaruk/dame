const canReachGoogle = require("./canReachGoogle");
const https = require("https");
const http = require("http");



/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} headers
 * @property {*} body
*/

/**
 * @typedef ResponseNode
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/

/**
 * @param {Options}
 * @returns {Promise<ResponseNode>}
*/
module.exports = function requestNode({
	method,
	fullUrl,
	headers,
	body,
}) {
	
	if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
		return console.log(`Method ${method} is not valid.`)
	};
	
	
	let protocol;
	
	if (fullUrl.startsWith("https")) {
		protocol = https;
	} else if (fullUrl.startsWith("http")) {
		protocol = http;
	} else {
		return console.log(`Protocol not valid. URL: ${fullUrl}`)
	};
	
	
	
	const options = {
		method,
		headers,
	};
	
	
	
	return new Promise( resolve => {
		
		try {
			
			const req = protocol.request(fullUrl, options, res => {
						
				let data = [];
				
				res.on('data', chunk => data.push(chunk));
				res.on('end', () => {
					
					data = Buffer.concat(data).toString();
					
					
					// Comprobamos si es un JSON {algo}
					if (data.startsWith("{") && data.endsWith("}") ) {
						try {
							const json = JSON.parse(data);
							data = json; // sólo asginamos si se ha podido parsear
						} catch (e) {};
					};
					
					const is200 = res.statusCode >= 200 && res.statusCode < 300;
					
					resolve({
						isError: !is200,
						code: res.statusCode,
						status: res.statusMessage,
						response: data,
					});
					
				});
				
			});
			
			
			req.on('error', async err => {
				
				if (await canReachGoogle()) {
					resolve({
						isError: true,
						code: -1,
						status: "No response from server",
						response: null,
						error: err,
					});
				} else {
					resolve({
						isError: true,
						code: -2,
						status: "No internet connection",
						response: null,
						error: err,
					});
				};
				
			});
			
			
			if (body) req.write(body);
			req.end();
			
			
			
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
