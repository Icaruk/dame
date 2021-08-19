const dame = require("../../src/dame");

//! https://gorest.co.in



const dameApi = dame.new({
	baseUrl: "http://localhost:3200",
});



test("login_fail", async () => {
	
	const {code, isError, response} = await dameApi.post("/login", {
		username: "badIcaruk",
		password: "bad1234",
	});
	
	
	expect(code).toBe(401);
	expect(isError).toBe(true);
	
});



test("login_ok", async () => {
	
	const {code, isError, response} = await dameApi.post("/login", {
		username: "Icaruk",
		password: "1234",
	});
	
	
	expect(code).toBe(200);
	expect(isError).toBe(false);
	expect(response.token).toBeTruthy();
	
	
	dameApi.headers.Authorization = "Bearer " + response.token;
	
});



test("crud_user", async () => {
	
	const resPost = await dameApi.post("/user", {
		username: "Pepe",
		age: 99,
	});
	
	
	expect(resPost.code).toBe(200);
	expect(resPost.isError).toBe(false);
	expect(resPost.response.id).toBeTruthy();
	
	const insertedUserId = resPost.response.id;
	
	
	
	const resGet = await dameApi.get(`/user?id=${insertedUserId}`);
	
	expect(resGet.code).toBe(200);
	expect(resGet.isError).toBe(false);
	expect(resGet.response.username).toBe("Pepe");
	expect(resGet.response.age).toBe(99);
	
	
	
	const resPatch = await dameApi.patch(`/user?id=${insertedUserId}`, {
		age: 30
	});
	
	expect(resPatch.code).toBe(200);
	expect(resPatch.isError).toBe(false);
	expect(resPatch.response.age).toBe(30);
	
	
	
	const resDelete = await dameApi.delete(`/user?id=${insertedUserId}`);
	
	expect(resDelete.code).toBe(200);
	expect(resDelete.isError).toBe(false);
	
	
	
	const resGet2 = await dameApi.get(`/user?id=${insertedUserId}`);
	
	expect(resGet2.code).toBe(404);
	expect(resGet2.isError).toBe(true);
	
});


