
const https = require("https");
const buildUrl = require("../utils/buildUrl");
const canReachGoogle = require("../utils/canReachGoogle");
const requestNode = require("../utils/requestNode");



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
    
    
    get(url, options = {}) {
		
		const baseUrl = this.config && this.config.default && this.config.default.baseUrl;
		const fullUrl = buildUrl(baseUrl, url, options.ignoreBase)
		
		return requestNode({
			method: "GET",
			fullUrl: fullUrl,
		});
		
	};
	
	
	
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
	
	
	
    put() {
		
		
		
	};
	
	
	
    patch() {
		
		
		
	};
	
	
	
    delete() {
		
		
		
	};
	
	
	
	
	
	/**
	 * 
	 * @param {string} configKey 
	 * @param {"baseUrl" | "token"} key 
	 * @param {*} value 
	*/
	setConfig(configKey, key, value) {
		if (!this.config[configKey]) this.config[configKey] = {};
		this.config[configKey][key] = value;
	};
    
};

const dame = new Dame();
module.exports = dame;