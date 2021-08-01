const dame = require("../lib/dame");
const fetch = require("node-fetch");
const { get_simple, get_config_baseUrl } = require("./fnc/get");



describe("GET", () => {
	
	global.fetch = fetch;
	
	
	get_simple();
	get_config_baseUrl()
	
});