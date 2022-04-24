import type { RollupOptions } from 'rollup';

export interface BundleESMPluginOptions {
	/**
		Specify a custom matcher to match packages that should be bundled regardless of ESM or CommonJS format
	*/
	forceBundle?: RollupOptions['external'];

	/**
		Specify the path to the package.json file
	*/
	packageJson?: string;
}

export type RollupExternalFunction = (
	source: string,
	importer: string | undefined,
	isResolved: boolean
) => boolean | null | void;
