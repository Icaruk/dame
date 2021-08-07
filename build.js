require('esbuild').build({
	entryPoints: [
		"src/dame.js",
	],
	bundle: true,
	minifyWhitespace: true,
	minifySyntax: false,
	minifyIdentifiers: false,
	format: "cjs",
	platform: "neutral",
	external: ["http", "https", "dns", "url"],
	outdir: 'lib',
}).catch(() => process.exit(1))