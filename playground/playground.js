
const dame = require("../src/dame");
const fs = require("fs");
const qs = require("qs");



(async() => {
	
	const res = await dame.get("http://localhost:3000/redir?times=2");
	console.log( res );
	
})();