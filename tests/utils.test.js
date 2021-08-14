
const buildHeaders = require("../utils/buildHeaders");
const buildUrl = require("../utils/buildUrl");
const checkIsError = require("../utils/checkIsError");


describe("utils", () => {
	
	test("buildHeaders", async () => {
		
		let headers = buildHeaders(
			{
				headers: {
					asd: 1,
				}
			}, 
			{
				headers: {
					asd: 2,
				}
			}
		);
		expect(headers.asd).toBe(1);
		
		
		headers = buildHeaders(
			{
				headers: {
					asd: 2,
				}
			}
		);
		expect(headers.asd).toBe(2);
		
		
		headers = buildHeaders(
			{},
			{
				headers: {
					asd: 1,
				}
			}
		);
		expect(headers.asd).toBe(1);
		
		
		headers = buildHeaders(
			{},
			undefined
		);
		expect(headers).toStrictEqual({});
		
		
		
	});
	
	
	
	test("buildUrl", async () => {
		
		let url = buildUrl(
			null,
			{
				baseUrl: "instanceUrl"
			}
		);
		expect(url).toBe("");
		
		
		url = buildUrl(
			"http://asd.es",
			{
				baseUrl: "instanceUrl"
			}
		);
		expect(url).toBe("http://asd.es");
		
		
		url = buildUrl(
			"/path",
			{
				baseUrl: "instanceUrl"
			}
		);
		expect(url).toBe("instanceUrl/path");
		
		
	});
	
	
	
	test("checkIsError", async () => {
		
		let isError = checkIsError();
		expect(isError).toBe(true);
		
		isError = checkIsError(200);
		expect(isError).toBe(false);
		
		isError = checkIsError(299);
		expect(isError).toBe(false);
		
		isError = checkIsError(300);
		expect(isError).toBe(true);
		
	});
	
});