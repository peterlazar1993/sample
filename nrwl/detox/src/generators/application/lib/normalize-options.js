"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const devkit_1 = require("@nrwl/devkit");
/**
 * if options.name = 'my-app-e2e' with no options.directory
 * projectName = 'my-app', projectRoot = 'apps/my-app'
 * if options.name = 'my-app' with options.directory = 'my-dir'
 * projectName = 'my-dir-my-app', projectRoot = 'apps/my-dir/my-apps'
 */
function normalizeOptions(host, options) {
    const { appsDir } = devkit_1.getWorkspaceLayout(host);
    const fileName = devkit_1.names(options.name).fileName;
    const directoryFileName = options.directory
        ? devkit_1.names(options.directory).fileName
        : '';
    const projectName = directoryFileName
        ? `${directoryFileName.replace(new RegExp('/', 'g'), '-')}-${fileName}`
        : fileName;
    const projectRoot = directoryFileName
        ? devkit_1.joinPathFragments(appsDir, directoryFileName, fileName)
        : devkit_1.joinPathFragments(appsDir, fileName);
    const { fileName: appFileName, className: appClassName } = devkit_1.names(options.project);
    return Object.assign(Object.assign({}, options), { appFileName,
        appClassName, name: fileName, projectName,
        projectRoot });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map