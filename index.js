
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
		
		const req = https.request({
			hostname: this.config.default.baseUrl,
			port: 443,
			path: url,
			method: "GET",
		}, (res) => {
			
			console.log("statusCode:", res.statusCode);
			console.log("headers:", res.headers);

			res.on("data", (d) => {
				process.stdout.write(d);
			});
		});
		
		req.on("error", (e) => {
			console.error(e);
		});
		
		req.end();
		
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