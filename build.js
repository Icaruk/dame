require('esbuild').build({
	entryPoints: ['lib/dame.js'],
	bundle: true,
	minify: true,
	format: "esm",
	external: ["http", "https", "dns"],
	outfile: 'lib/out.js',
}).catch(() => process.exit(1))