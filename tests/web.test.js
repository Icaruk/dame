const fetch = require("node-fetch");

beforeAll(() => {
	global.fetch = fetch;
});

describe("web", () => {
	require("./fnc/get.test.js");
	require("./fnc/crud.test.js");
	require("./fnc/redirects.test.js");
});
