"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolveRequest = void 0;
const tslib_1 = require("tslib");
const metroResolver = require("metro-resolver");
const tsconfig_paths_1 = require("tsconfig-paths");
const chalk = require("chalk");
/*
 * Use tsconfig to resolve additional workspace libs.
 *
 * This resolve function requires projectRoot to be set to
 * workspace root in order modules and assets to be registered and watched.
 */
function getResolveRequest(extensions) {
    return function (_context, realModuleName, platform, moduleName) {
        const DEBUG = process.env.NX_REACT_NATIVE_DEBUG === 'true';
        if (DEBUG)
            console.log(chalk.cyan(`[Nx] Resolving: ${moduleName}`));
        const { resolveRequest } = _context, context = tslib_1.__rest(_context, ["resolveRequest"]);
        try {
            return metroResolver.resolve(context, moduleName, platform);
        }
        catch (_a) {
            if (DEBUG)
                console.log(chalk.cyan(`[Nx] Unable to resolve with default Metro resolver: ${moduleName}`));
        }
        const matcher = getMatcher();
        let match;
        const matchExtension = extensions.find((extension) => {
            match = matcher(realModuleName, undefined, undefined, ['.' + extension]);
            return !!match;
        });
        if (match) {
            return {
                type: 'sourceFile',
                filePath: !matchExtension || match.endsWith(`.${matchExtension}`)
                    ? match
                    : `${match}.${matchExtension}`,
            };
        }
        else {
            if (DEBUG) {
                console.log(chalk.red(`[Nx] Failed to resolve ${chalk.bold(moduleName)}`));
                console.log(chalk.cyan(`[Nx] The following tsconfig paths was used:\n:${chalk.bold(JSON.stringify(paths, null, 2))}`));
            }
            throw new Error(`Cannot resolve ${chalk.bold(moduleName)}`);
        }
    };
}
exports.getResolveRequest = getResolveRequest;
let matcher;
let absoluteBaseUrl;
let paths;
function getMatcher() {
    const DEBUG = process.env.NX_REACT_NATIVE_DEBUG === 'true';
    if (!matcher) {
        const result = tsconfig_paths_1.loadConfig();
        if (result.resultType === 'success') {
            absoluteBaseUrl = result.absoluteBaseUrl;
            paths = result.paths;
            if (DEBUG) {
                console.log(chalk.cyan(`[Nx] Located tsconfig at ${chalk.bold(absoluteBaseUrl)}`));
                console.log(chalk.cyan(`[Nx] Found the following paths:\n:${chalk.bold(JSON.stringify(paths, null, 2))}`));
            }
            matcher = tsconfig_paths_1.createMatchPath(absoluteBaseUrl, paths);
        }
        else {
            console.log(chalk.cyan(`[Nx] Failed to locate tsconfig}`));
            throw new Error(`Could not load tsconfig for project`);
        }
    }
    return matcher;
}
//# sourceMappingURL=metro-resolver.js.map