
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const requestNode = require("../utils/requestNode");
const requestWeb = require("../utils/requestWeb");
const raceTimeout = require("../utils/raceTimeout");



function postWrapper(_arguments, method) {
	
	const url = _arguments[0];
	let body = _arguments[1];
	let configGroup = null;
	let options = null;
	
	
	if (typeof _arguments[2] === "string") { // tengo {url, body, configGroup, options}
		configGroup = _arguments[2];
		options = _arguments[3];
	} else { // tengo {url, body, options}
		configGroup = "default";
		options = _arguments[2];
	};
	
	if (!configGroup) configGroup = "default";
	if (!options) options = {};
	
	
	if (typeof body !== "string") body = JSON.stringify(_arguments[1]);
	
	const fullUrl = buildUrl(url, config[configGroup]);
	const headers = buildHeaders(options.headers, config[configGroup]);
	
	
	
	let fncRequest = requestNode;
	if (typeof window !== "undefined") fncRequest = requestWeb;
	
	
	options.headers = {
		"Content-Type": "application/json",
		"Content-Length": body.length,
		...headers,
	};
	
	
	
	let promise = fncRequest({
		method: method,
		fullUrl: fullUrl,
		body: body,
		options,
		config: config[configGroup],
	});
	
	
	return raceTimeout(promise, options.timeout, config[configGroup]);	
	
};



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
 * @property {*} requestOptions Request or fetch extra options.
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
		
		
		options.headers = headers;
		
		
		let fncRequest = requestNode;
		if (typeof window !== "undefined") fncRequest = requestWeb;
		
		
		
		let promise = fncRequest({
			method: "GET",
			fullUrl: fullUrl,
			options,
			config: config[configGroup],
		});
		
		
		return raceTimeout(promise, options.timeout, config[configGroup]);
		
	},
	
	/** @type {PostFnc} */
    post: function () {
		return postWrapper(arguments, "POST");
	},
	
	/** @type {PostFnc} */
    put: function () {
		return postWrapper(arguments, "PUT");
	},
	
	/** @type {PostFnc} */
    patch: function () {
		return postWrapper(arguments, "PATCH");
	},
	
	/** @type {PostFnc} */
    delete: function () {
		return postWrapper(arguments, "DELETE");
	},
	
	
	
	/**
	 * @param {string} configGroup Config group to set a key-value pair.
	 * @param {string} key Defaults are `baseUrl`, `headers` and `timeout`.
	 * @param {*} value 
	*/
	setConfig: (configGroup, key, value) => {
		if (!config[configGroup]) config[configGroup] = {};
		config[configGroup][key] = value;
	},
	
	
	
	/**
	 * @param {string} configGroup Config group to clear.
	*/
	clearConfig: (configGroup) => {
		if (config[configGroup]) config[configGroup] = {};
	},
	
	
	
	/**
	 * @param {string} configGroup Config group to get. If empty returns all config.
	 * @param {*} value 
	*/
	getConfig: (configGroup) => {
		if (!configGroup) return config;
		return config[configGroup];
	},
    
};



module.exports = dame;
