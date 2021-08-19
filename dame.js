'use strict';

var require$$1 = require('https');
var require$$2 = require('http');
var require$$3 = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);

var buildUrl$1 = function buildUrl(url, dameInstance) {
	
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	
	if (dameInstance.baseUrl) return dameInstance.baseUrl + url;
	
	/* istanbul ignore next */ 
	return url;
	
};

var buildHeaders$1 = function buildHeaders(config, dameInstance = {}) {
	
	const configHeaders = config.headers;
	const dameInstanceHeaders = dameInstance.headers;
	
	const configHeadersOk = configHeaders && Object.keys(configHeaders).length > 0;
	const dameInstanceHeadersOk = dameInstanceHeaders && Object.keys(dameInstanceHeaders).length > 0;
	
	if (configHeadersOk && dameInstanceHeadersOk) return {...dameInstanceHeaders, ...configHeaders};
	if (configHeadersOk) return configHeaders;
	if (dameInstanceHeadersOk) return dameInstanceHeaders;
	
	return {};
	
};

var buildTimeout$2 = function buildTimeout(config, instance) {
	if (config.timeout) return config.timeout;
	if (instance.timeout) return instance.timeout;
	return null;
};

const buildTimeout$1 = buildTimeout$2;


var raceTimeout$1 = function raceTimeout(promise, options, dameInstance) {
	
	let timeout = buildTimeout$1(options, dameInstance);
	
	
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
	}	
};

var checkIsError = function checkIsError(code) {
	if (!code) return true;
	return !(code >= 200 && code < 300);
};

var buildMaxRedirects$2 = function buildMaxRedirects(config, instance) {
	
	if (config.maxRedirects !== null && config.maxRedirects !== undefined) {
		return config.maxRedirects;
	} else {
		return  instance.maxRedirects;
	}	
};

const buildMaxRedirects$1 = buildMaxRedirects$2;
const buildTimeout = buildTimeout$2;



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
var requestWeb = function requestWeb({
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
	}	
	
	
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
			let maxRedirects = buildMaxRedirects$1(config, instance);
			
			
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
				
				
				
				const checkIsError = config.checkIsError || instance.checkIsError;
				const isError = checkIsError(response.status);
				
				
				
				resolve({
					isError: isError,
					code: response.status,
					status: response.statusText,
					response: data,
					redirectCount: totalRedirects,
				});
				
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
			}			
			
			resolve({
				isError: true,
				code: -1,
				status: "No response from server",
				response: null,
				error: err,
			});
			
		}		
	});
	
};

const buildMaxRedirects = buildMaxRedirects$2;



/**
 * @typedef RequestNodeOptions
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * @property {string} fullUrl
 * @property {*} body
 * @property {*} config
 * @property {*} instance Dame instance
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
 * @param {RequestNodeOptions}
 * @returns {Promise<ResponseNode>}
*/
var requestNode = function requestNode({
	method,
	fullUrl,
	body,
	config,
	instance,
}) {
	
	const https = require$$1__default['default'];
	const http = require$$2__default['default'];
	const url = require$$3__default['default'];
	
	
	
	if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
		return {
			isError: true,
			code: -999,
			status: "Error",
			response: null,
			error: `Method ${method} is not valid.`,
		};
	}	
	
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
	}	
	
	
	const _requestOptions = {
		method,
		...config,
	};
	
	
	
	// Redirect config
	let totalRedirects = 0;
	let maxRedirects = buildMaxRedirects(config, instance);
	
	
	
	const _request = (fullUrl) => {
		
		if (maxRedirects > 0 && totalRedirects > maxRedirects) return {
			isError: true,
			code: 0,
			status: "Error",
			response: null,
			error: "Too many redirects",
			redirectCount: totalRedirects,
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
						if (maxRedirects > 0) {
							if (res.statusCode > 300 && res.statusCode < 400) {
								if (url.parse(headers.location).hostname) {
									totalRedirects ++;
									resolve(_request(headers.location));
								} else {
									const parsedUrl = url.parse(fullUrl);
									const newUrl = `${parsedUrl.protocol}//${parsedUrl.host}${headers.location}`;
									
									totalRedirects ++;
									resolve(_request(newUrl));
								};
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
						
						
						
						const checkIsError = config.checkIsError || instance.checkIsError;
						const isError = checkIsError(res.statusCode);
						
						
						
						resolve({
							isError: isError,
							code: res.statusCode,
							status: res.statusMessage,
							response: data,
							redirectCount: totalRedirects,
						});
						
					});
					
				});
				
				
				
				req.on('error', async err => {
					
					// if (await canReachGoogle()) {
					// 	resolve({
					// 		isError: true,
					// 		code: -1,
					// 		status: "No response from server",
					// 		response: null,
					// 		error: err,
					// 	});
					// } else {
					// 	resolve({
					// 		isError: true,
					// 		code: -2,
					// 		status: "No internet connection",
					// 		response: null,
					// 		error: err,
					// 	});
					// };
					
					resolve({
						isError: true,
						code: -1,
						status: "No response from server",
						response: null,
						error: err,
					});
					
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
			}			
		});
		
	};
	
	
	return _request(fullUrl);
	
};

const buildUrl = buildUrl$1;
const buildHeaders = buildHeaders$1;
const raceTimeout = raceTimeout$1;
const fncCheckIsError = checkIsError;



const postWrapper = (url, body, config = {}, method, dameInstance) => {
	
	const fullUrl = buildUrl(url, dameInstance);
	let headers = buildHeaders(config, dameInstance);
	
	
	const fncRequest = (typeof window !== "undefined") ? requestWeb : requestNode;
	
	
	
	if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
	
	config.headers = {
		...headers,
	};
	
	
	if (
		headers["Content-Type"] === "application/json" &&
		body &&
		typeof body === "object"
	) {
		body = JSON.stringify(body);
		config.headers["Content-Length"] = body.length || 0;
	}	

	
	let promise = fncRequest({
		method: method,
		fullUrl: fullUrl,
		body: body,
		config: config,
		instance: dameInstance,
	});
	
	
	return raceTimeout(promise, config, dameInstance);	
	
};



/**
 * @typedef Response
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/

/**
 * @typedef Config
 * @property {Object} headers
 * @property {number} [timeout] Number of miliseconds for the timeout.
 * @property {number} [maxRedirects=20] Max redirects to follow. Default 20. Use 0 to disable redirects.
 * @property {*} requestOptions Request or fetch extra options.
*/



/**
 * @callback GetFnc
 * @param {Url} url Full URL or path. If it starts with `http://` or `https://` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl`.
 * @param {Config} [config] Config
 * 
 * @returns {Promise<Response>}
*/



/**
 * @callback PostFnc
 * @param {Url} url Full URL or path. If it starts with `http://` or `https://` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl`.
 * @param {Object} body Body of the request.
 * @param {Config} [config] Config
 * 
 * @returns {Promise<Response>}
*/




/**
 * Creates a new instance of dame with pre-set configuration.
 * @callback NewFnc
 * @param {Config} config 
 * @param {string} [instanceName] If set, the instance will be saved on `dame.instances.<instanceName>`.
 * @returns {DameInstance}
*/



/**
 * @typedef DameInstance
 * @property {GetFnc} get
 * @property {PostFnc} post
 * @property {PostFnc} put
 * @property {PostFnc} patch
 * @property {GetFnc} delete
 * @property {NewFnc} new
 * 
 * @property {Array<DameInstance>} instances
 * 
 * @property {string} baseUrl
 * @property {*} options
 * @property {*} headers
 * @property {function} checkIsError
 * @property {number} timeout
 * @property {number} maxRedirects
*/



/**
 * @type {DameInstance}
*/
class Dame {
	
	constructor(constructorOptions = {}) {
		
		this.baseUrl = constructorOptions.baseUrl;
		this.options = constructorOptions.options || {};
		this.headers = constructorOptions.headers || {};
		this.checkIsError = constructorOptions.checkIsError || fncCheckIsError;
		this.timeout = constructorOptions.timeout;
		this.maxRedirects = constructorOptions.maxRedirects || 20;
		this.instances = [];
		
	};
	
	
	
    get(url, config = {}) {
		
		const fullUrl = buildUrl(url, this);
		const headers = buildHeaders(config, this);
		
		config.headers = headers;
		
		
		const hasWindow = typeof window !== "undefined";
		const fncRequest = hasWindow ? requestWeb : requestNode;
		
		
		let promise = fncRequest({
			method: "GET",
			fullUrl: fullUrl,
			config: config,
			instance: this,
		});
		
		
		if (hasWindow) return promise;
		else return raceTimeout(promise, config, this);
		
	}
	
    post(url, body, config) {
		return postWrapper(url, body, config, "POST", this);
	}
	
    put(url, body, config) {
		return postWrapper(url, body, config, "PUT", this);
	}
	
    patch(url, body, config) {
		return postWrapper(url, body, config, "PATCH", this);
	}
	
    delete(url, config) {
		return postWrapper(url, null, config, "DELETE", this);
	}
	
	new(config, instanceName) {
		
		const instance = new Dame(config);
		if (instanceName) {
			if (!this.instances) this.instances = {};
			this.instances[instanceName] = instance;
		}		
		return instance;
		
	};
    
}


/**
 * @type {DameInstance}
*/
const dame = new Dame();

var dame_1 = dame;

module.exports = dame_1;
