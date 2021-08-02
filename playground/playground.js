
const dame = require("../lib/dame");
// const fs = require("fs");


dame.setConfig("default", "baseUrl", "https://rickandmortyapi.com/api");
dame.setConfig("default", "headers", {
	Authorization: "Bearer a4jkl.q345a.a45a.a45"
});
// dame.setConfig("default", "timeout", 5000);

dame.setConfig("test", "baseUrl", "http://localhost:3000");
dame.setConfig("test", "headers", {
	Authorization: "Bearer a4jkl.q345a.a45a.a45"
});



(async() => {
	
	
	const dameRes = await dame.get("http://localhost:3000/redir");
	console.log( dameRes );
	
	
	// const res = await dame.get("/");
	
	// const res = await dame.post("http://localhost:3000/login", {
	// 	user: "asd",
	// 	password: "123"
	// });
	
	// console.log( res );
	
	
	// console.log( await dame.get("/character/99999") );
	// a = {
	// 	response: { error: 'Character not found' },
	// 	code: 404,
	// 	status: 'Not Found',
	// 	isError: true
	// }
	
	// const {response} = await dame.get("https://i.blogs.es/c68014/casa-3d/1366_2000.jpeg");
	// console.log( response );
	
	// fs.writeFileSync("test.png", response);
	
	
	// const dameRes = await dame.delete(`http://localhost:3000/lead?_id=6103d2c21d069623584d3a68`, null, {
	// 	headers: {
	// 		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM3LCJ1c2VybmFtZSI6ImF0b3J0YWphZGEiLCJuYW1lIjoiQWRyaWFuIFRvcnRhamFkYSIsInJvbGUiOjMsImV4dGVuc2lvbiI6IjMwOSIsImlhdCI6MTYyNzYzMDAxMiwiZXhwIjoxNjI3NjczMjEyfQ.EG55zE8P3hbFr_WtS2iyD263KEVZrgLqmce7ygPXYnY"
	// 	}
	// });
	
	// console.log( dameRes );
	
	
	// console.log ( await dame.get("/character/12") );
	// a = {
	// 	response: {
	// 	  id: 12,
	// 	  name: 'Alexander',
	// 	  status: 'Dead',
	// 	  species: 'Human',
	// 	  type: '',
	// 	  gender: 'Male',
	// 	  origin: {
	// 		name: 'Earth (C-137)',
	// 		url: 'https://rickandmortyapi.com/api/location/1'
	// 	  },
	// 	  location: {
	// 		name: 'Anatomy Park',
	// 		url: 'https://rickandmortyapi.com/api/location/5'
	// 	  },
	// 	  image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
	// 	  episode: [ 'https://rickandmortyapi.com/api/episode/3' ],
	// 	  url: 'https://rickandmortyapi.com/api/character/12',
	// 	  created: '2017-11-04T20:32:33.144Z'
	// 	},
	// 	code: 200,
	// 	status: 'OK',
	// 	isError: true
	//   }
	
    
    
	// console.log ( await dame.post("http://localhost:4000/echo", {
    //     username: "Icaruk",
    //     password: "asdf",
    //     email: "adrian@icaruk.dev",
    // }, {
    //     ignoreBase: true,
    // }));
	
	// a = {
	// 	isError: false,
	// 	code: 200,
	// 	status: 'OK',
	// 	response: {
	// 	  body: {
	// 		username: 'Icaruk',
	// 		password: 'asdf',
	// 		email: 'adrian@icaruk.dev'
	// 	  }
	// 	}
	// }	
	
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



