
const buildMaxRedirects = require("./buildMaxRedirects");
const buildTimeout = require("./buildTimeout");



/**
 * @typedef RequestWebOptions
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} body
 * @property {*} config
 * @property {*} instance Dame instance
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
 * @param {RequestWebOptions}
 * @returns {Promise<ResponseWeb>}
*/
module.exports = function requestWeb({
	method,
	fullUrl,
	body,
	config,
	instance,
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
	
	
	
	return new Promise( async resolve => {
		
		try {
			
			const _fetchOptions = {
				method,
				redirect: "manual",
				...config,
			};
			if (method !== "GET") _fetchOptions.body = body;
			
			
			
			// Redirect config
			let totalRedirects = 0;
			let maxRedirects = buildMaxRedirects(config, instance);
			
			
			// Timeout
			_fetchOptions.timeout = buildTimeout(config, instance);
			
			
			
			const _request = async (fullUrl) => {
				
				if (maxRedirects > 0 && totalRedirects > maxRedirects) return resolve({
					isError: true,
					code: 0,
					status: "Error",
					response: null,
					error: "Too many redirects",
					redirected: true,
					redirectCount: totalRedirects,
				});
				
				
				
				let response = await window.fetch(fullUrl, _fetchOptions);
				const responseHeaders = response.headers;
				const redirectLocation = responseHeaders.get("location");
				
				
				// Compruebo redirect
				if (maxRedirects > 0) {
					if (response.status > 300 && response.status < 400) {
						
						const url = new URL(redirectLocation);
						
						if (url.hostname) {
							totalRedirects ++;
							return _request(redirectLocation);
						} else {
							const newUrl = `${url.protocol}//${url.host}${redirectLocation}`;
							
							totalRedirects ++;
							return _request(newUrl);
						};
					};
				};
				
				
				let data = response;
				
				const contentTypeRaw = responseHeaders.get("Content-Type"); // null o algo como 'application/json; charset=utf-8'
				const contentType = contentTypeRaw && contentTypeRaw.split("; "); // 'application/json; charset=utf-8' → ['application/json', 'charset=utf-8']
				const contentTypeLow = contentType && contentType[0].toLowerCase(); // 'application/json'
				
				
				try {
					
					if (contentTypeLow) {
						
						if (contentTypeLow.startsWith("application/json")) {
							
							// const json = await response.json();
							// data = json;
							if (!config.responseType) config.responseType = "json";
							
						} else if (contentTypeLow.startsWith("text")) {
							
							// data.toString();
							if (!config.responseType) config.responseType = "text";
							
						};
						
						
						switch ( (config.responseType || "").toLowerCase() ) {
							case "json": data = await response.json(); break;
							case "text": data = await response.text(); break;
							case "arraybuffer": data = await response.arrayBuffer(); break;
							case "blob": data = await response.blob(); break;
							// case "stream": data = await response.blob(); break;
						};
						
					};
					
				} catch (err) {};
				
				
				
				const checkIsError = config.checkIsError || instance.checkIsError;
				const isError = checkIsError(response.status);
				
				
				const resol = {
					isError: isError,
					code: response.status,
					status: response.statusText,
					response: data,
				};
				if (totalRedirects > 0) resol.redirectCount = totalRedirects;
				
				
				resolve(resol);
				
			};
			
			
			return await _request(fullUrl);
			
			
		} catch (err) {
			
			if (err.type === "request-timeout") {
				resolve({
					isError: true,
					code: 0,
					status: 'Timed out',
					response: null,
				});
			};
			
			
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
