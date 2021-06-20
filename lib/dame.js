
const buildUrl = require("../utils/buildUrl");
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
	 * @returns {Promise<Response>}
	*/
    get(url, options = {}) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		
		if (typeof window !== "undefined") return requestWeb({
			method: "POST",
			fullUrl: fullUrl,
		});
		
		return requestNode({
			method: "GET",
			fullUrl: fullUrl,
		});
		
	};
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise<Response>}
	*/
    post(url, body = {}, options) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
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
		
	};
	
	
	
	/**
	 * @param {Url}
	 * @param {Body}
	 * @param {Options}
	 * @returns {Promise<Response>}
	*/
    put(url, body = {}, options) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
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
		
	};
	
	
	
    patch() {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
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
		
	};
	
	
	
    delete() {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
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