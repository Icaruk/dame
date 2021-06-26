
const express = require('express');
const app = express();
const port = 3000;



app.get("/", (req, res) => {
	
	console.log( JSON.stringify(req.headers) );
	
	res.send({
		query: req.query,
		params: req.params,
		headers: req.headers,
	});
});

app.post("/", (req, res) => {
	res.send({
		query: req.query,
		body: req.body,
		params: req.params,
		headers: req.headers,
	});
});



app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
