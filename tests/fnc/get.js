const dame = require("../../lib/dame");



exports.get_simple = async () => {
	
	test("get_simple", async () => {
		
		const dameRes = await dame.get("https://gorest.co.in/public/v1/users/2");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});
	
};



exports.get_config_baseUrl = async () => {
	
	test("get_config_baseUrl", async () => {
		
		dame.clearConfig("default");
		dame.setConfig("default", "baseUrl", "https://gorest.co.in/public/v1");
		
		const dameRes = await dame.get("/users/2");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});	
	
};



exports.get_options_checkIsError = async () => {
	
	test("get_options_checkIsError", async () => {
		
		const dameRes = await dame.get("https://gorest.co.in/public/v1/users/2", {
			checkIsError: () => "abcd1234!",
		});
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe("abcd1234!");
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});	
	
};



exports.get_config_checkIsError = async () => {
	
	test("get_config_checkIsError", async () => {
		
		dame.clearConfig("default");
		dame.setConfig("default", "checkIsError", () => "abcd1234!");
		
		const dameRes = await dame.get("https://gorest.co.in/public/v1/users/2");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe("abcd1234!");
		expect(response.data.email).toBe("patricia1234@gmail.com");
		
	});	
	
};