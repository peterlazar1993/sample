"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
const child_process_1 = require("child_process");
let childProcess;
function bundleExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* bundleExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        options.bundleOutput = path_1.relative(context.root, projectRoot)
            .split(path_1.sep)
            .map(() => '..')
            .concat(options.bundleOutput)
            .join(path_1.sep);
        workspace_1.createDirectory(path_1.dirname(path_1.join(projectRoot, options.bundleOutput)));
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        try {
            yield tslib_1.__await(runCliBuild(context.root, projectRoot, options));
            yield yield tslib_1.__await({ success: true });
        }
        finally {
            if (childProcess) {
                childProcess.kill();
            }
        }
    });
}
exports.default = bundleExecutor;
function runCliBuild(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        const cliOptions = createBundleOptions(options);
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/react-native/cli.js'), ['bundle', ...cliOptions], { cwd: projectRoot });
        // Ensure the child process is killed when the parent exits
        process.on('exit', () => childProcess.kill());
        process.on('SIGTERM', () => childProcess.kill());
        childProcess.on('error', (err) => {
            reject(err);
        });
        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve(code);
            }
            else {
                reject(code);
            }
        });
    });
}
function createBundleOptions(options) {
    return Object.keys(options).reduce((acc, _k) => {
        const v = options[_k];
        const k = workspace_1.toFileName(_k);
        if (v === undefined)
            return acc;
        acc.push(`--${k}`, v);
        return acc;
    }, []);
}
//# sourceMappingURL=bundle.impl.js.map