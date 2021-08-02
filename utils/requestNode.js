const canReachGoogle = require("./canReachGoogle");
const https = require("https");
const http = require("http");
const checkIsError = require("./checkIsError");
const url = require("url");



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
	requestOptions,
	config
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
	
	
	let protocol;
	
	
	let fullUrlLow = fullUrl.toLowerCase();
	
	if (fullUrlLow.startsWith("https://")) {
		protocol = https;
	} else if (fullUrlLow.startsWith("http://")) {
		protocol = http;
	} else {
		return {
			isError: true,
			code: -999,
			status: "Error",
			response: null,
			error: `Protocol not valid. URL: ${fullUrl}`
		};
	};
	
	
	
	const _requestOptions = {
		method,
		headers,
		...requestOptions,
	};
	
	
	
	const _request = (fullUrl, remainingRedirects) => {
		
		
		if (remainingRedirects <= 0) return {
			isError: true,
			code: 0,
			status: "Error",
			response: null,
			error: "Too many redirects"
		};
		
		
		
		return new Promise( resolve => {
			
			try {
				
				const req = protocol.request(fullUrl, _requestOptions, res => {
					
					let data = [];
					
					res.on('data', chunk => data.push(chunk));
					res.on('end', () => {
						
						data = Buffer.concat(data);
						const headers = res.headers;
						
						
						// Compruebo redirect
						if (res.statusCode > 300 && res.statusCode < 400) {
							if (url.parse(headers.location).hostname) {
								resolve(_request(headers.location, --remainingRedirects));
							};
						};
						
						
						
						const contentType = headers && headers["content-type"];
						const arrContentType = contentType && contentType.split("; "); // 'application/json; charset=utf-8'
						const contentTypeLow = arrContentType && arrContentType.length > 0 && arrContentType[0].toLowerCase();
						
						
						// https://www.iana.org/assignments/media-types/media-types.xhtml
						
						try {
							if (contentTypeLow.startsWith("application/json")) {
								const json = JSON.parse(data);
								data = json; // sólo asginamos si se ha podido parsear
							} else if (contentTypeLow.startsWith("text")) {
								data.toString();
							};
						} catch (e) {};
						
						
						
						const isError = checkIsError(res.statusCode, _requestOptions, config);
						
						
						
						resolve({
							isError: isError,
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
	
	
	return _request(fullUrl, 5);
	
};
