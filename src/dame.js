
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const raceTimeout = require("../utils/raceTimeout");
const fncCheckIsError = require("../utils/checkIsError");



const postWrapper = (_arguments, method, dameInstance) => {
	
	let [url, body = {}, config = {}] = _arguments;
	
	
	if (body && typeof body === "object") body = JSON.stringify(body);
	
	const fullUrl = buildUrl(url, dameInstance);
	const headers = buildHeaders(config, dameInstance);
	
	
	
	const fncRequest = (typeof window !== "undefined") ? require("../utils/requestWeb") : require("../utils/requestNode");
	
	
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
		
		
		const fncRequest = (typeof window !== "undefined") ? require("../utils/requestWeb") : require("../utils/requestNode");
		
		
		
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
		};
		
		return instance;
		
	};
    
};



module.exports = new Dame();
