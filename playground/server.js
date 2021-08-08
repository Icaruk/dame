
const express = require('express');
const app = express();
const fs = require("fs");


const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));



// -------------------------------------------------------------------------------------------------------------------------------


// const multer = require('multer');
// const upload = multer({ dest: 'files/' })

// app.use(fileUpload({
// 	limits: { fileSize: 50 * 1024 * 1024 },
// 	debug: true,
// }));



const token = "E36gf.7VbDs.ZAcP90.BVd3Df";
const users = {};



// -------------------------------------------------------------------------------------------------------------------------------



app.get("/", (req, res) => {
	res.send({
		query: req.query,
		params: req.params,
		headers: req.headers,
	});
});

app.get("/redir", (req, res) => {
	res.redirect(301, "/redirected");
});
app.get("/redirected", (req, res) => {
	res.send({
		redirected: true,
	})
});



app.post("/login", (req, res) => {

	const { username, password } = req.body;

	if (username === "Icaruk" && password === "1234") {
		return res.send({
			username: username,
			token: token,
		});
	};

	res.status(401).send({
		message: "Invalid credentials",
	});

});



app.post("/user", (req, res) => {

	const { authorization } = req.headers;
	const { username, age } = req.body;


	if (authorization !== ("Bearer" + token)) return res.status(401).send({ message: "Invalid token" });


	const userId = "id" + Date.now();

	users[userId] = {
		username,
		age,
	};

	res.send({
		message: "Invalid credentials",
		id: userId,
	});

});

app.get("/user", (req, res) => {

	const { authorization } = req.headers;
	const { id } = req.query;


	if (authorization !== ("Bearer" + token)) return res.status(401).send({ message: "Invalid token" });


	if (users[id]) return res.send(users[id]);
	return res.status(404).send({ message: "User not found" });

});

app.patch("/user", (req, res) => {

	const { authorization } = req.headers;
	const { id } = req.query;
	const { age } = req.body;


	if (authorization !== ("Bearer" + token)) return res.status(401).send({ message: "Invalid token" });


	if (users[id]) {
		users[id].age = age;
		res.send(users[id]);
		return;
	};

	return res.status(404).send({ message: "User not found" });

});

app.delete("/user", (req, res) => {

	const { authorization } = req.headers;
	const { id } = req.query;


	if (authorization !== ("Bearer" + token)) return res.status(401).send({ message: "Invalid token" });


	if (users[id]) {
		delete users[id];
		res.send({
			message: `User ${id} has been deleted`
		});
		return;
	};

	return res.status(404).send({ message: "User not found" });

});



app.post('/image', (req, res) => {

	console.log("req.files", `(${typeof req.files}): `, req.files);

	res.json('/image api');
});



app.listen(port, () => {
	console.log(`Listening http://localhost:${port}`)
});
