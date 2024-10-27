/**
 * @jest-environment node
 */

describe("node", () => {
	require("./fnc/get.test.js");
	require("./fnc/crud.test.js");
	require("./fnc/redirects.test.js");
});
