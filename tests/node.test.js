/**
* @jest-environment node
*/

describe("node", () => {
	require("./fnc/get");
	require("./fnc/crud");
	require("./fnc/redirects");
});