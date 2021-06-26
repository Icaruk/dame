
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const requestNode = require("../utils/requestNode");
const requestWeb = require("../utils/requestWeb");



/** @typedef {string} Url Full URL you want to request */
/** @typedef {*} Body */

/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * 
*/

/**
 * @typedef Response
 * @property {boolean} isError
 * @property {number} code
 * @property {string} status
 * @property {*} response
 * @property {* | null} error
*/



let config = {
	/*
	default: {
		baseUrl: "",
		headers: {},
	}
	*/
};

const dame = {
    
	/**
	 * @param {Url} url
	 * @param {Options} options
	 * @returns {Promise<Response>}
	*/
    get: function () {
		
		const url = arguments[0];
		let configId = "default";
		let options = {};
		
		if (typeof arguments[1] === "string") {
			configId = arguments[1];
			options = arguments[2];
		} else {
			options = arguments[1];
		};
		
		
		
		const baseUrl = config && config.default && config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		const headers = buildHeaders(options.headers, config);
		
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "GET",
			fullUrl: fullUrl,
			headers: headers,
		});
		
		return requestNode({
			method: "GET",
			fullUrl: fullUrl,
			headers: headers,
		});
		
	},
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise<Response>}
	*/
    post: (url, body = {}, options) => {
		
		const baseUrl = config && config.default && config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "POST",
			fullUrl: fullUrl,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length
			},
			body: body,
		});
		
		return requestNode({
			method: "POST",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});
		
	},
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise<Response>}
	*/
    put: (url, body = {}, options) => {
		
		const baseUrl = config && config.default && config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "PUT",
			fullUrl: fullUrl,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length
			},
			body: body,
		});
		
		return requestNode({
			method: "PUT",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});
		
	},
	
	
	
    patch: () => {
		
		const baseUrl = config && config.default && config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "PATCH",
			fullUrl: fullUrl,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length
			},
			body: body,
		});
		
		return requestNode({
			method: "PATCH",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});			
		
	},
	
	
	
    delete: () => {
		
		const baseUrl = config && config.default && config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "DELETE",
			fullUrl: fullUrl,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length
			},
			body: body,
		});
		
		return requestNode({
			method: "DELETE",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});		
		
	},
	
	
	
	/**
	 * 
	 * @param {string} configGroup Default is `default`.
	 * @param {string} key Defaults are `baseUrl` and `headers`.
	 * @param {*} value 
	*/
	setConfig: (configGroup, key, value) => {
		if (!config[configGroup]) config[configGroup] = {};
		config[configGroup][key] = value;
	},
    
};

module.exports = dame;
