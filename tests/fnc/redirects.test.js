const dame = require("../../src/dame");

test("1 redirect", async () => {
	const dameRes = await dame.get("http://localhost:3200/redir?extra=0");
	const { code, isError, response, redirectCount } = dameRes;

	expect(code).toBe(200);
	expect(isError).toBe(false);
	expect(response.redirected).toBe(true);
	expect(redirectCount).toBe(1);
});

test("5 redirect", async () => {
	const dameRes = await dame.get("http://localhost:3200/redir?extra=4");
	const { code, isError, redirectCount } = dameRes;

	expect(code).toBe(200);
	expect(isError).toBe(false);
	expect(redirectCount).toBe(5);
});

test("5 redirect max 2", async () => {
	const dameRes = await dame.get("http://localhost:3200/redir?extra=4", {
		maxRedirects: 2,
	});
	const { code, isError, redirectCount } = dameRes;

	expect(code).toBe(0);
	expect(isError).toBe(true);
	expect(redirectCount).toBe(3);
});

test("5 redirect but maxRedirects=0 response=301", async () => {
	const dameRes = await dame.get("http://localhost:3200/redir?extra=4", {
		maxRedirects: 0,
	});
	const { code, isError, redirectCount } = dameRes;

	expect(code).toBe(301);
	expect(isError).toBe(true);
	expect(redirectCount).toBe(undefined);
});
