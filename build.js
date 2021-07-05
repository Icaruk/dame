require('esbuild').build({
	entryPoints: ["lib/dame.js"],
	bundle: true,
	minifyWhitespace: true,
	minifySyntax: true,
	minifySyntax: true,
	minifyIdentifiers: false,
	format: "esm",
	external: ["http", "https", "dns"],
	outfile: 'index.js',
}).catch(() => process.exit(1))