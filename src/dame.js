
const buildUrl = require("../utils/buildUrl");
const buildHeaders = require("../utils/buildHeaders");
const raceTimeout = require("../utils/raceTimeout");
const fncCheckIsError = require("../utils/checkIsError");



const postWrapper = (url, body, config = {}, method, dameInstance) => {
	
	const fullUrl = buildUrl(url, dameInstance);
	let headers = buildHeaders(config, dameInstance);
	
	
	const fncRequest = (typeof window !== "undefined") ? require("../utils/requestWeb") : require("../utils/requestNode");
	
	
	
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
		const fncRequest = hasWindow ? require("../utils/requestWeb") : require("../utils/requestNode");
		
		
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
		};
		
		return instance;
		
	};
    
};



/**
 * @type {DameInstance}
*/
const dame = new Dame();

module.exports = dame;
