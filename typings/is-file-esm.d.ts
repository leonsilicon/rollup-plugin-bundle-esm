declare module 'is-file-esm' {
	type Result = {
		esm: boolean;
		type: string;
		extType: string;
		path: string;
		pkgPath: string;
	};

	declare const isFileEsm: {
		constants: {
			ERR_PATH_MUST_BE_STRING: string;
			ERR_PATH_MUST_BE_ABSOLUTE: string;
			ERR_PATH_MUST_EXIST: string;
			ERR_PATH_MUST_HAVE_VALID_EXT: string;
		};

		(
			path: string,
			callback: (error: Error | null, result?: Result) => void
		): void;
		(path: string): Promise<Result>;
		sync(path: string): Result;
	};

	export = isFileEsm;
}
