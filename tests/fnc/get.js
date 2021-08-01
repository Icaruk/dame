const dame = require("../../lib/dame");



exports.get_simple = async () => {
	
	test("GET simple", async () => {
		
		const dameRes = await dame.get("https://gorest.co.in/public/v1/users/2");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});
	
};



exports.get_config_baseUrl = async () => {
	
	test("GET config baseUrl", async () => {
		
		dame.setConfig("default", "baseUrl", "https://gorest.co.in/public/v1");
		
		const dameRes = await dame.get("/users/2");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});	
	
};