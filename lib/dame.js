
const buildUrl = require("../utils/buildUrl");
const requestNode = require("../utils/requestNode");



/** @typedef {string} Url Full URL you want to request */
/** @typedef {*} Body */

/**
 * @typedef Options
 * @property {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method
 * 
*/



class Dame {
    
	config = {
		/*
		default: {
			baseUrl: "",
			token: "",
		}
		*/
	};
	
	
    constructor() {
        
        if (typeof Dame.instance === "object") return Dame.instance;
        Dame.instance = this;
        
        return this;
    };
    
    
	
	/**
	 * @param {Url}
	 * @param {Options}
	 * @returns {Promise}
	*/
    get(url, options = {}) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		return requestNode({
			method: "GET",
			fullUrl: fullUrl,
		});
		
	};
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise}
	*/
    post(url, body = {}, options) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		return requestNode({
			method: "POST",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});
		
	};
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise}
	*/
    put(url, body = {}, options) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		return requestNode({
			method: "PUT",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});
		
	};
	
	
	
    patch() {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		return requestNode({
			method: "PATCH",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});			
		
	};
	
	
	
    delete() {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		body = JSON.stringify(body);
		
		
		return requestNode({
			method: "DELETE",
			fullUrl: fullUrl,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': body.length
			},
			body: body,
		});		
		
	};
	
	
	
	/**
	 * 
	 * @param {string} configGroup Default is `default`.
	 * @param {string} key Defaults are `baseUrl` and `token`.
	 * @param {*} value 
	*/
	setConfig(configGroup, key, value) {
		if (!this.config[configGroup]) this.config[configGroup] = {};
		this.config[configGroup][key] = value;
	};
    
};

const dame = new Dame();
module.exports = dame;