
const https = require("https");
const buildUrl = require("../utils/buildUrl");
const canReachGoogle = require("../utils/canReachGoogle");


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
		
		
		return new Promise( resolve => {
			
			try {
			
				https.get(fullUrl, res => {
					
					let data = [];
					
					
					res.on('data', chunk => data.push(chunk));
					
					res.on('end', () => {
						
						data = Buffer.concat(data).toString();
						
						if (data[0] === "{") {
							data = JSON.parse(data);
						};
						
						
						const is200 = res.statusCode >= 200 && res.statusCode < 300;
						
						resolve({
							isError: !is200,
							code: res.statusCode,
							status: res.statusMessage,
							response: data,
						});
						
					});
					
				}).on('error', async err => {
					
					if (await canReachGoogle()) {
						resolve({
							isError: true,
							code: -1,
							status: "No response from server",
							response: null,
							error: err,
						});
					} else {
						resolve({
							isError: true,
							code: -2,
							status: "No internet connection",
							response: null,
							error: err,
						});
					};
					
					
				});
				
			} catch (err) {
				resolve({
					isError: true,
					code: -999,
					status: "Exception",
					response: err,
				});
			};
			
		});
		
	};
	
	
	
    post(url, body, options) {
		
		
		
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