
const bench = require("nanobench");
const axios = require("axios");
const phin = require("phin");
const dame = require("../lib/dame");



const times = 100;
const url = "https://rickandmortyapi.com/api/character/12";




bench("await axios", async (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		await axios.get(url);
	};
	
	b.end();
});
bench("axios", (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		axios.get(url);
	};
	
	b.end();
});





bench("await phin", async (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		await phin({
			url: url,
			method: "GET",
			parse: "JSON",
		});
	};
	
	b.end();
});
bench("phin", (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		phin({
			url: url,
			method: "GET",
			parse: "JSON",
		});
	};
	
	b.end();
});




bench("await dame", async (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		await dame.get(url, {ignoreBase: true});
	};
	
	b.end();
});
bench("dame", (b) => {
	b.start();
	
	for (let i = 0; i < times; i++) {
		dame.get(url, {ignoreBase: true});
	};
	
	b.end();
});
