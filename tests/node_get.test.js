/**
 * @jest-environment node
*/

const dame = require("../lib/dame");
const {get_simple, get_config_baseUrl} = require("./fnc/get");



describe("GET", () => {
	
	get_simple();
	get_config_baseUrl();
	
});