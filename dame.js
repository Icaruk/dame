'use strict';

var require$$0 = require('https');
var require$$1 = require('http');
var require$$2 = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

var buildUrl$1 = function buildUrl(url, dameInstance) {
	
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	
	if (dameInstance.baseUrl) return dameInstance.baseUrl + url;
	
	return url;
	
};

var buildHeaders$1 = function buildHeaders(config, dameInstance = {}) {
	
	const optionHeaders = config.headers;
	const dameInstanceHeaders = dameInstance.headers;
	
	if (optionHeaders && dameInstanceHeaders) return {...dameInstanceHeaders, ...optionHeaders};
	if (optionHeaders) return optionHeaders;
	if (dameInstanceHeaders) return dameInstanceHeaders;
	
	return {};
	
};

var raceTimeout$1 = function raceTimeout(promise, options, dameInstance) {
	
	let timeout;
	
	if (dameInstance.timeout) timeout = dameInstance.timeout;
	if (options.timeout) timeout = options.timeout;
	
	
	
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
	
	// if (!window.navigator.onLine) return {
	// 	isError: true,
	// 	code: -2,
	// 	status: "No internet connection",
	// 	response: null,
	// 	error: null,
	// };
	
	
	
	return new Promise( async resolve => {
		
		try {
			
			const _fetchOptions = {
				method,
				...config,
			};
			if (method !== "GET") _fetchOptions.body = body;
			
			
			let response = await window.fetch(fullUrl, _fetchOptions);
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
			});
			
		} catch (err) {
			
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
var requestNode = function requestNode({
	method,
	fullUrl,
	body,
	config,
	instance,
}) {
	
	const https = require$$0__default['default'];
	const http = require$$1__default['default'];
	const url = require$$2__default['default'];
	
	
	
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
	
	
	let totalRedirects = 0;
	
	
	const _request = (fullUrl) => {
		
		if (totalRedirects >= 5) return {
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
								totalRedirects ++;
								resolve(_request(headers.location));
							} else {
								const parsedUrl = url.parse(fullUrl);
								const newUrl = `${parsedUrl.protocol}//${parsedUrl.host}${headers.location}`;
								
								totalRedirects ++;
								resolve(_request(newUrl));
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



const postWrapper = (_arguments, method, dameInstance) => {
	
	let [url, body = {}, config = {}] = _arguments;
	
	
	if (body && typeof body === "object") body = JSON.stringify(body);
	
	const fullUrl = buildUrl(url, dameInstance);
	const headers = buildHeaders(config, dameInstance);
	
	
	
	const fncRequest = (typeof window !== "undefined") ? requestWeb : requestNode;
	
	
	config.headers = {
		"Content-Type": "application/json",
		"Content-Length": body.length,
		...headers,
	};
	
	
	
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
 * @property {number} timeout Number of miliseconds for the timeout.
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
 * @callback NewFnc
 * @param {Config} [config] Config
*/



class Dame {
	
	constructor(constructorOptions = {}) {
		
		const {
			baseUrl,
			options = {},
			headers = {},
			checkIsError = fncCheckIsError,
			timeout
		} = constructorOptions;
		
		
		
		this.baseUrl = baseUrl;
		this.options = options;
		this.headers = headers;
		this.checkIsError = checkIsError;
		this.timeout = timeout;
		
	};
	
	
	
	/** @type {GetFnc} */
    get(url, config = {}) {
		
		const fullUrl = buildUrl(url, this);
		const headers = buildHeaders(config, this);
		
		config.headers = headers;
		
		
		const fncRequest = (typeof window !== "undefined") ? requestWeb : requestNode;
		
		
		
		let promise = fncRequest({
			method: "GET",
			fullUrl: fullUrl,
			config: config,
			instance: this,
		});
		
		
		return raceTimeout(promise, config, this);
		
	}
	
	/** @type {PostFnc} */
    post() {
		return postWrapper(arguments, "POST", this);
	}
	
	/** @type {PostFnc} */
    put() {
		return postWrapper(arguments, "PUT", this);
	}
	
	/** @type {PostFnc} */
    patch() {
		return postWrapper(arguments, "PATCH", this);
	}
	
	/** @type {PostFnc} */
    delete() {
		return postWrapper(arguments, "DELETE", this);
	}
	
	
	
	/**
	 * Creates a new instance of dame with pre-set configuration.
	 * @param {Config} config 
	 * @param {string} [instanceName] If set, the instance will be saved on `dame.instances.<instanceName>`.
	 * @returns 
	*/
	new(config, instanceName) {
		
		const instance = new Dame(config);
		if (instanceName) {
			if (!this.instances) this.instances = {};
			this.instances[instanceName] = instance;
		}		
		return instance;
		
	};
    
}


var dame = new Dame();

module.exports = dame;
