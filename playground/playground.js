
const dame = require("../src/dame");
const fs = require("fs");
const qs = require("qs");



(async() => {
	
	const res = await dame.delete("http://localhost:3200/user", {
		headers: {
			Authorization: "Bearer E36gf.7VbDs.ZAcP90.BVd3Df"
		}
	});
	
	console.log( res );
	
})();