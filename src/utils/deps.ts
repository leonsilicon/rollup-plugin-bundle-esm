import * as fs from 'node:fs';
import type { PackageJson } from 'type-fest';

export default function getProjectDependencies(
	packageJsonPath: string,
	type: keyof PackageJson = 'dependencies'
): Record<string, string> {
	try {
		const pkg = JSON.parse(
			fs.readFileSync(packageJsonPath, 'utf8')
		) as PackageJson;
		return (pkg[type] as Record<string, string>) ?? {};
	} catch {
		return {};
	}
}
