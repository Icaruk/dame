const dame = require("../../lib/dame");
const fs = require("fs");

//! https://gorest.co.in



test("get_simple", async () => {
	
	const dameRes = await dame.get("https://gorest.co.in/public/v1/users");
	const {code, isError, response } = dameRes;
	
	
	expect(code).toBe(200);
	expect(isError).toBe(false);
	expect(response.meta.pagination.page).toBe(1);
	
});



test("get_pre_baseUrl", async () => {
	
	const dameGoRest = dame.new({
		baseUrl: "https://gorest.co.in/public/v1"
	});
	
	const dameRes = await dameGoRest.get("/users");
	const {code, isError, response } = dameRes;
	
	expect(code).toBe(200);
	expect(isError).toBe(false);
	expect(response.meta.pagination.page).toBe(1);
	
});



test("get_checkIsError", async () => {
	
	const {code, isError, response } = await dame.get("https://gorest.co.in/public/v1/users", {
		checkIsError: () => "abcd1234!"
	});
	
	
	expect(code).toBe(200);
	expect(isError).toBe("abcd1234!");
	expect(response.meta.pagination.page).toBe(1);
	
});



test("get_pre_checkIsError", async () => {
	
	const dameGoRest = dame.new();	
	dameGoRest.checkIsError = () => "abcd1234!";
	
	const dameRes = await dameGoRest.get("https://gorest.co.in/public/v1/users");
	const {code, isError, response } = dameRes;
	
	expect(code).toBe(200);
	expect(isError).toBe("abcd1234!");
	expect(response.meta.pagination.page).toBe(1);
	
});




test("get_timeout", async () => {
	
	const {code, status, isError, response } = await dame.get("https://gorest.co.in/public/v1/users", {
		timeout: 1
	});
	
	
	expect(code).toBe(0);
	expect(isError).toBe(true);
	expect(response).toBe(null);
	expect(status).toBe("Timed out");
	
});



test("get_pre_timeout", async () => {
	
	const dameGoRest = dame.new({
		timeout: 1,
	});
	
	const {code, status, isError, response } = await dameGoRest.get("https://gorest.co.in/public/v1/users");
	
	
	expect(code).toBe(0);
	expect(isError).toBe(true);
	expect(response).toBe(null);
	expect(status).toBe("Timed out");
	
});



test("get_pre_vs_config_timeout", async () => {
	
	const dameGoRest = dame.new({
		timeout: 1,
	});
	
	const {code, isError} = await dameGoRest.get("https://gorest.co.in/public/v1/users", {
		timeout: 20000,
	});
	
	
	expect(code).toBe(200);
	expect(isError).toBe(false);
	
});



test("get_image", async () => {
	
	const res = await dame.get("https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg");
	
	const filePath = "./casa.jpeg";
	fs.writeFileSync(filePath, res.response);
	
	
	const exists = fs.existsSync(filePath);
	expect(exists).toBe(true);
	
	fs.unlinkSync(filePath);
	
});



test("get_merge_headers", async () => {
	
	const dameIns = dame.new({
		headers: {
			Authorization: "Bearer: abcd.1234"
		},
	});
	
	const {isError, code, response} = await dameIns.get("http://localhost:3000/", {
		headers: {
			CustomHeader: "1234",
		}
	});
	
	
	expect(isError).toBe(false);
	expect(code).toBe(200);
	expect(response.headers.authorization).toBe("Bearer: abcd.1234");
	expect(response.headers.customheader).toBe("1234");
	
});
