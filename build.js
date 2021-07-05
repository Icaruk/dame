require('esbuild').build({
	entryPoints: ["lib/dame.js"],
	bundle: true,
	minify: true,
	format: "esm",
	external: ["http", "https", "dns"],
	outfile: 'index.js',
}).catch(() => process.exit(1))