
const dame = require("../src/dame");
const fs = require("fs");
const qs = require("qs");



(async() => {
	
	const dameGoRest = dame.new({
		timeout: 1,
	});
	
	const res = await dameGoRest.get("https://gorest.co.in/public/v1/users", {
		timeout: 4000,
	});
	
	console.log( res );
	
})();