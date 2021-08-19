
const fetch = require("node-fetch");



beforeAll( () => {
	global.fetch = fetch;
});


describe("web", () => {
	require("./fnc/get");
	require("./fnc/crud");
	require("./fnc/redirects");
});