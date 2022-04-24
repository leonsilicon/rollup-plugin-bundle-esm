# rollup-plugin-bundle-esm

## Installation

```shell
npm install --save-dev rollup-plugin-bundle-esm
```

## Usage

Add `rollup-plugin-bundle-esm` to your rollup config:

```typescript
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
  plugins: [commonjs(), nodeResolve(), bundleESM()],
});
```

If you want to

## Why?

While using ESM whenever possible is preferred, there are some situations where ESM isn't supported and you have to fall back to CommonJS (e.g. Electron). However, I would still like to use ESM dependencies whenever possible (especially for the libraries I publish). Thus, a possible solution to this problem is dual-packaging by creating a CommonJS bundle where all the ESM packages are bundled into the library itself. However, the bundling should only be done with the ESM packages in order to minimize bundle size and edge-cases with dependency bundling. Thus, I created `rollup-plugin-bundle-esm` to ensure that only the ESM packages get bundled and CommonJS packages get marked as external.
