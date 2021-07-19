require('esbuild').build({
	entryPoints: [
		"lib/dame.js",
	],
	bundle: true,
	minifyWhitespace: true,
	minifySyntax: true,
	minifyIdentifiers: false,
	format: "esm",
	external: ["http", "https", "dns"],
	outdir: 'out',
}).catch(() => process.exit(1))