
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';



/**
 * @type {import('rollup').RollupOptions}
*/
const config = {
	input: "src/dame.js",
	output: {
		file: "dame.js",
		name: "dameeee",
		format: "umd",
		exports: "auto",
		globals: {
			http: "http",
			https: "https",
			url: "url",
		}
	},
	external: ["http", "https", "url"],
	plugins: [ nodePolyfills(), commonjs(), resolve()],
};

export default config;