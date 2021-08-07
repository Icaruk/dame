
import commonjs from '@rollup/plugin-commonjs';

/**
 * @type {import('rollup').RollupOptions}
*/
const config = {
	input: "src/dame.js",
	output: {
		file: "dame.js",
		format: "cjs",
		exports: "auto",
	},
	external: ["http", "https", "dns", "url"],
	plugins: [commonjs()],
};

export default config;