
const fetch = require("node-fetch");



beforeAll( () => {
	global.fetch = fetch;
});


describe("web GET", () => {
	require("./fnc/get")
});