import { join } from 'desm';
import { execa } from 'execa';
import { lionFixture } from 'lion-fixture';
import * as fs from 'node:fs';
import path from 'node:path';
import { beforeAll, expect, test } from 'vitest';

const { fixture } = lionFixture(import.meta.url);

beforeAll(() => {
	fs.rmSync(join(import.meta.url, '../temp'), { recursive: true, force: true });
});

test('correctly bundles my-project/', async () => {
	const myProjectTempDir = await fixture('my-project');
	await execa('rollup', ['-c'], {
		cwd: myProjectTempDir,
		stdio: 'inherit',
	});

	expect(
		fs.readFileSync(path.join(myProjectTempDir, 'dist/index.js'), 'utf8')
	).to.include("require('qs')");
	expect(
		fs.readFileSync(path.join(myProjectTempDir, 'dist/index.js'), 'utf8')
	).to.not.include("require('minimist')");
	expect(
		fs.readFileSync(path.join(myProjectTempDir, 'dist/index.js'), 'utf8')
	).to.not.include("require('yargs')");
});

test('correctly bundles deep-dependency/', async () => {
	const deepDependencyTempDir = await fixture('deep-dependency');
	await execa('rollup', ['-c'], {
		cwd: deepDependencyTempDir,
		stdio: 'inherit',
	});
});
