require('esbuild').build({
	entryPoints: ['index.js'],
	bundle: true,
	minify: true,
	format: "esm",
	external: ["http", "https", "dns"],
	outfile: 'index.min.js',
}).catch(() => process.exit(1))