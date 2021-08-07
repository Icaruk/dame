/**
 * @jest-environment node
*/

const {get_simple, get_config_baseUrl, get_options_checkIsError, get_config_checkIsError} = require("./fnc/get");



describe("GET node", () => {
	
	// test("mock", () => {});
	
	
	get_simple();
	
	get_options_checkIsError();
	get_config_checkIsError();
	
	get_config_baseUrl();
	
});