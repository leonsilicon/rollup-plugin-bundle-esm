import isFileEsm from 'is-file-esm';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import type { Plugin } from 'rollup';

import type { BundleESMPluginOptions } from '~/types.js';
import getProjectDependencies from '~/utils/deps.js';
import externalToFunction from '~/utils/external.js';

export function bundleESM(options?: BundleESMPluginOptions): Plugin {
	return {
		name: 'bundle-esm',
		options(opts) {
			const originalExternal = externalToFunction(opts.external);
			const forceBundle =
				options?.forceBundle === undefined
					? undefined
					: externalToFunction(options.forceBundle, 'force-bundle');

			opts.external = (
				source: string,
				importer: string | undefined,
				isResolved: boolean
			) => {
				const isExternal = originalExternal(source, importer, isResolved);
				if (isExternal) {
					return true;
				}

				if (forceBundle?.(source, importer, isResolved)) {
					return false;
				}

				const dependencies = getProjectDependencies();
				if (!(source in dependencies)) {
					return null;
				}

				try {
					// If the package wasn't already external, check if the package is a CommonJS compatible package, and if so, also mark it as external
					const __require = createRequire(
						path.join(process.cwd(), 'package.json')
					);
					const entrypoint = __require.resolve(source);
					const { esm: isEsm } = isFileEsm.sync(entrypoint);

					if (isEsm) {
						// Make sure to bundle ESM (i.e. mark it as non-external)
						return false;
					} else {
						return true;
					}
				} catch {
					return null;
				}
			};

			return opts;
		},
	};
}
