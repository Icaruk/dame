
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const requestNode = require("../utils/requestNode");
const requestWeb = require("../utils/requestWeb");
const raceTimeout = require("../utils/raceTimeout");



let config = {
	/*
	default: {
		baseUrl: "",
		headers: {},
	}
	*/
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
 * @typedef Options
 * @property {Object} headers
 * @property {number} timeout Number of miliseconds for the timeout.
*/



/**
 * @callback GetFnc
 * @param {Url} url Full URL or path. If it starts with `http` or `https` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl` from config.
 * @param {string | Options} [configGroup] Skip this param if you want to use "default" configGroup.
 * @param {Options} [options] Options
 * 
 * @returns {Promise<Response>}
*/



/**
 * @callback PostFnc
 * @param {Url} url Full URL or path. If it starts with `http` or `https` it will be treated as full URL. Otherwise it will be concatenated with `baseUrl` from config.
 * @param {Object} body Body of the request.
 * @param {string | Options} [configGroup] Skip this param if you want to use "default" configGroup.
 * @param {Options} [options] Options
 * 
 * @returns {Promise<Response>}
*/



const dame = {
	
	/** @type {GetFnc} */
    get: function () {
		
		const url = arguments[0];
		let configGroup = "default";
		let options;
		
		if (typeof arguments[1] === "string") {
			configGroup = arguments[1];
			options = arguments[2];
		} else {
			options = arguments[1];
		};
		
		if (!options) options = {};
		
		
		const fullUrl = buildUrl(url, config[configGroup]);
		const headers = buildHeaders(options.headers, config[configGroup]);
		
		
		let promise;
		
		
		if (typeof window !== "undefined") {
			promise = requestWeb({
				method: "GET",
				fullUrl: fullUrl,
				headers: headers,
			});
		} else {	
			promise = requestNode({
				method: "GET",
				fullUrl: fullUrl,
				headers: headers,
			});
		};
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	/** @type {PostFnc} */
    post: function () {
		
		const url = arguments[0];
		const body = JSON.stringify(arguments[1]);
		let configGroup = null;
		let options = null;
		
		
		if (typeof arguments[2] === "string") { // tengo {url, body, configGroup, options}
			configGroup = arguments[2];
			options = arguments[3];
		} else { // tengo {url, body, options}
			configGroup = "default";
			options = arguments[2];
		};
		
		if (!configGroup) configGroup = "default";
		if (!options) options = {};
		
		
		const fullUrl = buildUrl(url, config[configGroup]);
		const headers = buildHeaders(options.headers, config[configGroup]);
		
		
		let promise;
		
		
		if (typeof window !== "undefined") {
			promise = requestWeb({
				method: "POST",
				fullUrl: fullUrl,
				headers: {
					...headers,
					"Content-Type": "application/json",
					"Content-Length": body.length
				},
				body: body,
			});
		} else {
			promise = requestNode({
				method: "POST",
				fullUrl: fullUrl,
				headers: {
					...headers,
					'Content-Type': 'application/json',
					'Content-Length': body.length
				},
				body: body,
			});
		};
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	/** @type {PostFnc} */
    put: function () {
		
		const url = arguments[0];
		const body = JSON.stringify(arguments[1]);
		let configGroup = null;
		let options = null;
		
		
		if (typeof arguments[2] === "string") { // tengo {url, body, configGroup, options}
			configGroup = arguments[2];
			options = arguments[3];
		} else { // tengo {url, body, options}
			configGroup = "default";
			options = arguments[2];
		};
		
		if (!configGroup) configGroup = "default";
		if (!options) options = {};
		
		
		const fullUrl = buildUrl(url, config[configGroup]);
		const headers = buildHeaders(options.headers, config[configGroup]);
		
		
		let promise;
		
		
		if (typeof window !== "undefined") {
			promise = requestWeb({
				method: "PUT",
				fullUrl: fullUrl,
				headers: {
					...headers,
					"Content-Type": "application/json",
					"Content-Length": body.length
				},
				body: body,
			});
		} else {
			promise = requestNode({
				method: "PUT",
				fullUrl: fullUrl,
				headers: {
					...headers,
					'Content-Type': 'application/json',
					'Content-Length': body.length
				},
				body: body,
			});
		};
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	/** @type {PostFnc} */
    patch: function () {
		
		const url = arguments[0];
		const body = JSON.stringify(arguments[1]);
		let configGroup = null;
		let options = null;
		
		
		if (typeof arguments[2] === "string") { // tengo {url, body, configGroup, options}
			configGroup = arguments[2];
			options = arguments[3];
		} else { // tengo {url, body, options}
			configGroup = "default";
			options = arguments[2];
		};
		
		if (!configGroup) configGroup = "default";
		if (!options) options = {};
		
		
		const fullUrl = buildUrl(url, config[configGroup]);
		const headers = buildHeaders(options.headers, config[configGroup]);
		
		
		let promise;
		
		
		if (typeof window !== "undefined") {
			promise = requestWeb({
				method: "PATCH",
				fullUrl: fullUrl,
				headers: {
					...headers,
					"Content-Type": "application/json",
					"Content-Length": body.length
				},
				body: body,
			});
		} else {			
			promise = requestNode({
				method: "PATCH",
				fullUrl: fullUrl,
				headers: {
					...headers,
					'Content-Type': 'application/json',
					'Content-Length': body.length
				},
				body: body,
			});
		};
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	/** @type {PostFnc} */
    delete: function () {
		
		const url = arguments[0];
		const body = JSON.stringify(arguments[1]);
		let configGroup = null;
		let options = null;
		
		
		if (typeof arguments[2] === "string") { // tengo {url, body, configGroup, options}
			configGroup = arguments[2];
			options = arguments[3];
		} else { // tengo {url, body, options}
			configGroup = "default";
			options = arguments[2];
		};
		
		if (!configGroup) configGroup = "default";
		if (!options) options = {};
		
		
		const fullUrl = buildUrl(url, config[configGroup]);
		const headers = buildHeaders(options.headers, config[configGroup]);
		
		
		let promise;
		
		
		if (typeof window !== "undefined") {
			promise = requestWeb({
				method: "DELETE",
				fullUrl: fullUrl,
				headers: {
					...headers,
					"Content-Type": "application/json",
					"Content-Length": body.length
				},
				body: body,
			});
		} else {	
			promise = requestNode({
				method: "DELETE",
				fullUrl: fullUrl,
				headers: {
					...headers,
					'Content-Type': 'application/json',
					'Content-Length': body.length
				},
				body: body,
			});
		};
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	
	
	/**
	 * @param {string} configGroup Default is `default`.
	 * @param {string} key Defaults are `baseUrl` and `headers`.
	 * @param {*} value 
	*/
	setConfig: (configGroup, key, value) => {
		if (!config[configGroup]) config[configGroup] = {};
		config[configGroup][key] = value;
	},
	
	
	
	/**
	 * @param {string} configGroup Default is `default`.
	 * @param {*} value 
	*/
	getConfig: (configGroup) => {
		if (!configGroup) return config;
		return config[configGroup];
	},
    
};



module.exports = dame;
