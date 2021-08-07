
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const requestNode = require("../utils/requestNode");
const requestWeb = require("../utils/requestWeb");
const raceTimeout = require("../utils/raceTimeout");
const fncCheckIsError = require("../utils/checkIsError");


const postWrapper = (_arguments, method, dameInstance) => {
	
	const [url, body = {}, config = {}] = _arguments;
	
	
	if (body && typeof body === "object") body = JSON.stringify(body);
	
	const fullUrl = buildUrl(url, dameInstance);
	const headers = buildHeaders(config, dameInstance);
	
	
	
	let fncRequest = requestNode;
	if (typeof window !== "undefined") fncRequest = requestWeb;
	
	
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
	
	
	return raceTimeout(promise, options, dameInstance);	
	
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
	
	baseUrl;
	headers;
	timeout;
	checkIsError;
	options;
	
	
	
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
    get = function (url, config = {}) {
		
		const fullUrl = buildUrl(url, this);
		const headers = buildHeaders(config, this);
		
		console.log( "fullUrl", `(${typeof fullUrl}): `, fullUrl);
		
		config.headers = headers;
		
		
		let fncRequest = requestNode;
		if (typeof window !== "undefined") fncRequest = requestWeb;
		
		
		
		let promise = fncRequest({
			method: "GET",
			fullUrl: fullUrl,
			config: config,
			instance: this,
		});
		
		
		return raceTimeout(promise, config, this);
		
	}
	
	/** @type {PostFnc} */
    post = function () {
		return postWrapper(arguments, "POST", this);
	}
	
	/** @type {PostFnc} */
    put = function () {
		return postWrapper(arguments, "PUT", this);
	}
	
	/** @type {PostFnc} */
    patch = function () {
		return postWrapper(arguments, "PATCH", this);
	}
	
	/** @type {PostFnc} */
    delete = function () {
		return postWrapper(arguments, "DELETE", this);
	}
	
	
	
	/**
	 * Creates a new instance of dame with pre-set configuration.
	 * @param {Config} options 
	 * @returns 
	*/
	new = (options) => {
		return new Dame(options);
	};
    
};



module.exports = new Dame();
