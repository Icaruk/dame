require('esbuild').build({
	entryPoints: [
		"src/dame.js",
	],
	bundle: true,
	minifyWhitespace: false,
	minifySyntax: false,
	minifyIdentifiers: false,
	format: "cjs",
	platform: "neutral",
	external: ["http", "https", "dns", "url"],
	outfile: "dame.min.js",
}).catch(() => process.exit(1))