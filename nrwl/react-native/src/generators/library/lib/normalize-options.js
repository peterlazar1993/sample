"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const devkit_1 = require("@nrwl/devkit");
function normalizeOptions(host, options) {
    const name = devkit_1.names(options.name).fileName;
    const projectDirectory = options.directory
        ? `${devkit_1.names(options.directory).fileName}/${name}`
        : name;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const fileName = projectName;
    const { libsDir, npmScope } = devkit_1.getWorkspaceLayout(host);
    const projectRoot = devkit_1.joinPathFragments(`${libsDir}/${projectDirectory}`);
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    const importPath = options.importPath || `@${npmScope}/${projectDirectory}`;
    const normalized = Object.assign(Object.assign({}, options), { fileName, routePath: `/${name}`, name: projectName, projectRoot,
        projectDirectory,
        parsedTags,
        importPath });
    return normalized;
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map