"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactNativeComponentSchematic = exports.reactNativeComponentGenerator = void 0;
const tslib_1 = require("tslib");
const ts = require("typescript");
const devkit_1 = require("@nrwl/devkit");
const normalize_options_1 = require("./lib/normalize-options");
const add_import_1 = require("./lib/add-import");
function reactNativeComponentGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const options = yield normalize_options_1.normalizeOptions(host, schema);
        createComponentFiles(host, options);
        addExportsToBarrel(host, options);
        yield devkit_1.formatFiles(host);
    });
}
exports.reactNativeComponentGenerator = reactNativeComponentGenerator;
function createComponentFiles(host, options) {
    const componentDir = devkit_1.joinPathFragments(options.projectSourceRoot, options.directory);
    devkit_1.generateFiles(host, devkit_1.joinPathFragments(__dirname, './files'), componentDir, Object.assign(Object.assign({}, options), { tmpl: '' }));
    for (const c of host.listChanges()) {
        let deleteFile = false;
        if (options.skipTests && /.*spec.tsx/.test(c.path)) {
            deleteFile = true;
        }
        if (deleteFile) {
            host.delete(c.path);
        }
    }
    if (options.js) {
        devkit_1.toJS(host);
    }
}
function addExportsToBarrel(host, options) {
    const workspace = devkit_1.getProjects(host);
    const isApp = workspace.get(options.project).projectType === 'application';
    if (options.export && !isApp) {
        const indexFilePath = devkit_1.joinPathFragments(options.projectSourceRoot, options.js ? 'index.js' : 'index.ts');
        const indexSource = host.read(indexFilePath, 'utf-8');
        if (indexSource !== null) {
            const indexSourceFile = ts.createSourceFile(indexFilePath, indexSource, ts.ScriptTarget.Latest, true);
            const changes = devkit_1.applyChangesToString(indexSource, add_import_1.addImport(indexSourceFile, `export * from './${options.directory}/${options.fileName}';`));
            host.write(indexFilePath, changes);
        }
    }
}
exports.default = reactNativeComponentGenerator;
exports.reactNativeComponentSchematic = devkit_1.convertNxGenerator(reactNativeComponentGenerator);
//# sourceMappingURL=component.js.map