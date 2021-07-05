"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const child_process_1 = require("child_process");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
const sync_deps_impl_1 = require("../sync-deps/sync-deps.impl");
const fs_1 = require("fs");
const start_impl_1 = require("../start/start.impl");
let childProcess;
function runAndroidExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* runAndroidExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        fs_1.chmodSync(path_1.join(projectRoot, 'android', 'gradlew'), 0o775);
        fs_1.chmodSync(path_1.join(projectRoot, 'android', 'gradlew.bat'), 0o775);
        if (options.sync) {
            sync_deps_impl_1.displayNewlyAddedDepsMessage(context.projectName, sync_deps_impl_1.syncDeps(context.projectName, projectRoot));
        }
        try {
            const tasks = [runCliRunAndroid(context.root, projectRoot, options)];
            if (options.packager) {
                tasks.push(start_impl_1.runCliStart(context.root, projectRoot, { port: options.port }));
            }
            yield tslib_1.__await(Promise.all(tasks));
            yield yield tslib_1.__await({ success: true });
        }
        finally {
            if (childProcess) {
                childProcess.kill();
            }
        }
    });
}
exports.default = runAndroidExecutor;
function runCliRunAndroid(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        /**
         * Call the react native cli with option `--no-packager`
         * Not passing '--packager' due to cli will launch start command from the project root
         */
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/react-native/cli.js'), ['run-android', ...createRunAndroidOptions(options), '--no-packager'], {
            cwd: projectRoot,
            env: Object.assign(Object.assign({}, process.env), { RCT_METRO_PORT: options.port.toString() }),
        });
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
const nxOptions = ['sync', 'install', 'packager'];
function createRunAndroidOptions(options) {
    return Object.keys(options).reduce((acc, k) => {
        const v = options[k];
        if (k === 'mainActivity') {
            acc.push(`--main-activity`, v);
        }
        else if (k === 'jetifier') {
            if (!v) {
                acc.push(`--no-jetifier`);
            }
        }
        else if (v && !nxOptions.includes(k)) {
            acc.push(`--${k}`, v);
        }
        return acc;
    }, []);
}
//# sourceMappingURL=run-android.impl.js.map