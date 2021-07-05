"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withNxMetro = void 0;
const app_root_1 = require("@nrwl/workspace/src/utils/app-root");
const metro_resolver_1 = require("./metro-resolver");
function withNxMetro(config, opts = {}) {
    const extensions = ['', 'ts', 'tsx', 'js', 'jsx'];
    if (opts.debug)
        process.env.NX_REACT_NATIVE_DEBUG = 'true';
    if (opts.extensions)
        extensions.push(...opts.extensions);
    // Set the root to workspace root so we can resolve modules and assets
    config.projectRoot = app_root_1.appRootPath;
    // Add support for paths specified by tsconfig
    config.resolver = Object.assign(Object.assign({}, config.resolver), { resolveRequest: metro_resolver_1.getResolveRequest(extensions) });
    return config;
}
exports.withNxMetro = withNxMetro;
//# sourceMappingURL=with-nx-metro.js.map