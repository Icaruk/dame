const dame = require("../../lib/dame");

//! https://gorest.co.in

exports.get_simple = async () => {
	
	test("get_simple", async () => {
		
		const dameRes = await dame.get("https://gorest.co.in/public/v1/users");
		console.log( "dameRes", `(${typeof dameRes}): `, dameRes);
		const {code, isError, response } = dameRes;
		
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.meta.pagination.page).toBe(1);
		
	});
	
};



exports.get_config_baseUrl = async () => {
	
	test("get_config_baseUrl", async () => {
		
		const dameGoRest = dame.new({
			baseUrl: "https://gorest.co.in/public/v1"
		});
		
		const dameRes = await dameGoRest.get("/users");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe(false);
		expect(response.meta.pagination.page).toBe(1);
		
	});
	
};



exports.get_options_checkIsError = async () => {
	
	test("get_options_checkIsError", async () => {
		
		const {code, isError, response } = await dame.get("https://gorest.co.in/public/v1/users", {
			checkIsError: () => "abcd1234!"
		});
		
		console.log( "code", `(${typeof code}): `, code);
		
		
		expect(code).toBe(200);
		expect(isError).toBe("abcd1234!");
		expect(response.meta.pagination.page).toBe(1);
		
	});
	
};



exports.get_config_checkIsError = async () => {
	
	test("get_config_checkIsError", async () => {
		return;
		const dameGoRest = dame.new();	
		dameGoRest.checkIsError = () => "abcd1234!";
		
		const dameRes = await dameGoRest.get("https://gorest.co.in/public/v1/users");
		const {code, isError, response } = dameRes;
		
		expect(code).toBe(200);
		expect(isError).toBe("abcd1234!");
		expect(response.meta.pagination.page).toBe(1);
		
	});
	
};