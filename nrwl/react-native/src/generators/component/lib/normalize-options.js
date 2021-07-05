"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
function normalizeOptions(host, options) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        assertValidOptions(options);
        const { className, fileName } = devkit_1.names(options.name);
        const componentFileName = options.pascalCaseFiles ? className : fileName;
        const project = devkit_1.getProjects(host).get(options.project);
        if (!project) {
            devkit_1.logger.error(`Cannot find the ${options.project} project. Please double check the project name.`);
            throw new Error();
        }
        const { sourceRoot: projectSourceRoot, projectType } = project;
        const directory = yield getDirectory(host, options);
        if (options.export && projectType === 'application') {
            devkit_1.logger.warn(`The "--export" option should not be used with applications and will do nothing.`);
        }
        options.classComponent = (_a = options.classComponent) !== null && _a !== void 0 ? _a : false;
        return Object.assign(Object.assign({}, options), { directory,
            className, fileName: componentFileName, projectSourceRoot });
    });
}
exports.normalizeOptions = normalizeOptions;
function getDirectory(host, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const fileName = devkit_1.names(options.name).fileName;
        const workspace = devkit_1.getProjects(host);
        let baseDir;
        if (options.directory) {
            baseDir = options.directory;
        }
        else {
            baseDir =
                workspace.get(options.project).projectType === 'application'
                    ? 'app'
                    : 'lib';
        }
        return options.flat ? baseDir : devkit_1.joinPathFragments(baseDir, fileName);
    });
}
function assertValidOptions(options) {
    const slashes = ['/', '\\'];
    slashes.forEach((s) => {
        if (options.name.indexOf(s) !== -1) {
            const [name, ...rest] = options.name.split(s).reverse();
            let suggestion = rest.map((x) => x.toLowerCase()).join(s);
            if (options.directory) {
                suggestion = `${options.directory}${s}${suggestion}`;
            }
            throw new Error(`Found "${s}" in the component name. Did you mean to use the --directory option (e.g. \`nx g c ${name} --directory ${suggestion}\`)?`);
        }
    });
}
//# sourceMappingURL=normalize-options.js.map