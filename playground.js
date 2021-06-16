
const dame = require("./index");



dame.setConfig("default", "baseUrl", "https://ganaenergia.com/api");
dame.setConfig("default", "token", "JWT");
dame.setConfig("crm", "baseUrl", "https://crm.ganaenergia.com");
dame.setConfig("crm", "token", "JWT_2");



console.log( "dame", `(${typeof dame}): `, dame);

return;



const {response, isError} = dame.post("/algo", objAlgo);
if (isError) return console.log(response.message);


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



