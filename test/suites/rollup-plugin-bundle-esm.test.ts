import { join } from 'desm';
import { execa, execaCommandSync } from 'execa';
import * as fs from 'node:fs';
import path from 'node:path';
import { beforeAll, expect, test } from 'vitest';

const tempDir = join(import.meta.url, '../temp');

function fixture(fixtureName: string) {
	const fixturesPath = join(import.meta.url, '../fixtures');
	fs.mkdirSync(tempDir, { recursive: true });
	const originalFixtureDir = path.join(fixturesPath, fixtureName);
	const tempFixtureDir = path.join(tempDir, fixtureName);
	fs.cpSync(originalFixtureDir, tempFixtureDir, { recursive: true });
	execaCommandSync('pnpm install', { cwd: tempFixtureDir });
	return tempFixtureDir;
}

beforeAll(() => {
	fs.rmSync(tempDir, { recursive: true, force: true });
});

test('correctly bundles esm modules', async () => {
	const tempFixtureDir = fixture('my-project');
	await execa('rollup', ['-c'], {
		cwd: tempFixtureDir,
		stdio: 'inherit',
	});

	expect(
		fs.readFileSync(path.join(tempFixtureDir, 'dist/index.js'), 'utf8')
	).to.include("require('qs')");
	expect(
		fs.readFileSync(path.join(tempFixtureDir, 'dist/index.js'), 'utf8')
	).to.not.include("require('minimist')");
	expect(
		fs.readFileSync(path.join(tempFixtureDir, 'dist/index.js'), 'utf8')
	).to.not.include("require('yargs')");
});
