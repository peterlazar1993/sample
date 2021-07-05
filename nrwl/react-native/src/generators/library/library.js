"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactNativeLibrarySchematic = exports.reactNativeLibraryGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const init_1 = require("../init/init");
const add_linting_1 = require("../../utils/add-linting");
const add_jest_1 = require("../../utils/add-jest");
const normalize_options_1 = require("./lib/normalize-options");
function reactNativeLibraryGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const options = normalize_options_1.normalizeOptions(host, schema);
        if (options.publishable === true && !schema.importPath) {
            throw new Error(`For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`);
        }
        addProject(host, options);
        createFiles(host, options);
        const initTask = yield init_1.default(host, Object.assign(Object.assign({}, options), { skipFormat: true, e2eTestRunner: 'none' }));
        const lintTask = yield add_linting_1.addLinting(host, options.name, options.projectRoot, [devkit_1.joinPathFragments(options.projectRoot, 'tsconfig.lib.json')], options.linter, options.setParserOptionsProject);
        if (!options.skipTsConfig) {
            updateBaseTsConfig(host, options);
        }
        const jestTask = yield add_jest_1.addJest(host, options.unitTestRunner, options.name, options.projectRoot);
        if (options.publishable || options.buildable) {
            updateLibPackageNpmScope(host, options);
        }
        if (!options.skipFormat) {
            yield devkit_1.formatFiles(host);
        }
        return run_tasks_in_serial_1.runTasksInSerial(initTask, lintTask, jestTask);
    });
}
exports.reactNativeLibraryGenerator = reactNativeLibraryGenerator;
function addProject(host, options) {
    const targets = {};
    if (options.publishable || options.buildable) {
        const { libsDir } = devkit_1.getWorkspaceLayout(host);
        const external = ['react/jsx-runtime'];
        targets.build = {
            executor: '@nrwl/web:package',
            outputs: ['{options.outputPath}'],
            options: {
                outputPath: `dist/${libsDir}/${options.projectDirectory}`,
                tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
                project: `${options.projectRoot}/package.json`,
                entryFile: maybeJs(options, `${options.projectRoot}/src/index.ts`),
                external,
                rollupConfig: `@nrwl/react/plugins/bundle-rollup`,
                assets: [
                    {
                        glob: `${options.projectRoot}/README.md`,
                        input: '.',
                        output: '.',
                    },
                ],
            },
        };
    }
    devkit_1.addProjectConfiguration(host, options.name, {
        root: options.projectRoot,
        sourceRoot: devkit_1.joinPathFragments(options.projectRoot, 'src'),
        projectType: 'library',
        tags: options.parsedTags,
        targets,
    });
}
function updateTsConfig(tree, options) {
    devkit_1.updateJson(tree, devkit_1.joinPathFragments(options.projectRoot, 'tsconfig.json'), (json) => {
        if (options.strict) {
            json.compilerOptions = Object.assign(Object.assign({}, json.compilerOptions), { forceConsistentCasingInFileNames: true, strict: true, noImplicitReturns: true, noFallthroughCasesInSwitch: true });
        }
        return json;
    });
}
function updateBaseTsConfig(host, options) {
    devkit_1.updateJson(host, 'tsconfig.base.json', (json) => {
        const c = json.compilerOptions;
        c.paths = c.paths || {};
        delete c.paths[options.name];
        if (c.paths[options.importPath]) {
            throw new Error(`You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`);
        }
        const { libsDir } = devkit_1.getWorkspaceLayout(host);
        c.paths[options.importPath] = [
            maybeJs(options, `${libsDir}/${options.projectDirectory}/src/index.ts`),
        ];
        return json;
    });
}
function createFiles(host, options) {
    devkit_1.generateFiles(host, devkit_1.joinPathFragments(__dirname, './files/lib'), options.projectRoot, Object.assign(Object.assign(Object.assign({}, options), devkit_1.names(options.name)), { tmpl: '', offsetFromRoot: devkit_1.offsetFromRoot(options.projectRoot) }));
    if (!options.publishable && !options.buildable) {
        host.delete(`${options.projectRoot}/package.json`);
    }
    if (options.js) {
        devkit_1.toJS(host);
    }
    updateTsConfig(host, options);
}
function updateLibPackageNpmScope(host, options) {
    return devkit_1.updateJson(host, `${options.projectRoot}/package.json`, (json) => {
        json.name = options.importPath;
        return json;
    });
}
function maybeJs(options, path) {
    return options.js && (path.endsWith('.ts') || path.endsWith('.tsx'))
        ? path.replace(/\.tsx?$/, '.js')
        : path;
}
exports.default = reactNativeLibraryGenerator;
exports.reactNativeLibrarySchematic = devkit_1.convertNxGenerator(reactNativeLibraryGenerator);
//# sourceMappingURL=library.js.map