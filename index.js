
const https = require("https");


class Dame {
    
	config = {
		/*
		default: {
			baseUrl: "",
			token: "",
		}
		*/
	}
	
	
    constructor() {
        
        if (typeof Dame.instance === "object") return Dame.instance;
        Dame.instance = this;
        
        return this;
    };
    
    
    get(url, options) {
		
		const baseUrl = this.config.default.baseUrl;
				
		https.get(baseUrl + url, res => {
			
			let data = [];
			
			const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
			
			console.log('Status Code:', res.statusCode);
			
			res.on('data', chunk => {
				data.push(chunk);
			});
			
			res.on('end', () => {
				const res = JSON.parse(Buffer.concat(data).toString());
			});
			
		}).on('error', err => {
			console.log('Error: ', err.message);
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