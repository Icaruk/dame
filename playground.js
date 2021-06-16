
// Import
const {validame, validameConfig} = require("./index");

validameConfig.language = "es";



let error = validame("mike", {
	allow: "1 a"
});



if (error === "") {
	console.log( "playground ✅" );
} else {
	console.log("playground ❌", error );
};




