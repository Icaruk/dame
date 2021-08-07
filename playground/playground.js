
const dame = require("../lib/dame");
const fs = require("fs");
const qs = require("qs");


// dame.setConfig("default", "baseUrl", "https://rickandmortyapi.com/api");
// dame.setConfig("default", "headers", {
// 	Authorization: "Bearer a4jkl.q345a.a45a.a45"
// });
// // dame.setConfig("default", "timeout", 5000);

// dame.setConfig("test", "baseUrl", "http://localhost:3000");
// dame.setConfig("test", "headers", {
// 	Authorization: "Bearer a4jkl.q345a.a45a.a45"
// });



(async() => {
	
	const dameRes = await dame.get("https://gorest.co.in/public/v1/users", {
		timeout: 1
	});
	
	console.log( "dameRes", `(${typeof dameRes}): `, dameRes);
	
})();









return;


// 200
res200 = {
	response: {
		message: "whatever",
	},
	code: 200,
	status: "OK",
	isError: false,
};

// 500
res500 = {
	response: null,
	code: 500,
	status: "Internal server error server error",
	isError: true,
};
// 500
res500_2 = {
	response: {
		message: {
			error: "mongoerror: sadjkldjasklja"
		}
	},
	code: 500,
	status: "Internal server error server error",
	isError: true,
};



// const {response, code, status} = dame.post("/algoCrm", {
//     user: "asd",
//     password: "asd",
// }, {
// 	config: "crm", // override config
// });



// const {response, code, status} = dame.post("https://api.neuro.com/dameDatos", {
//     user: "asd",
//     password: "asd",
// }, {
// 	useToken: false,
// 	ignoreBaseUrl: true,
// 	force: {
// 		token: "token_neuro",
// 	}
// });



