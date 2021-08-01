
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


app.get("/", (req, res) => {
	res.send({
		query: req.query,
		params: req.params,
		headers: req.headers,
	});
});

app.post("/login", (req, res) => {
	res.send({
		query: req.query,
		body: req.body,
		params: req.params,
		headers: req.headers,
	});
});



app.listen(port, () => {
	console.log(`Listening http://localhost:${port}`)
})
