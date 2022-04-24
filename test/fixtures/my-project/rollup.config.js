import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import bundleESM from 'rollup-plugin-bundle-esm';

export default defineConfig({
	output: {
		format: 'commonjs',
		dir: 'dist',
	},
	input: 'index.js',
	plugins: [
		commonjs(),
		nodeResolve(),
		bundleESM({
			forceBundle: ['minimist', 'yargs'],
		}),
	],
});
