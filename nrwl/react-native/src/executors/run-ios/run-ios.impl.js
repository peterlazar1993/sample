"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const child_process_1 = require("child_process");
const os_1 = require("os");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
const sync_deps_impl_1 = require("../sync-deps/sync-deps.impl");
const pod_install_task_1 = require("../../utils/pod-install-task");
const start_impl_1 = require("../start/start.impl");
let childProcess;
function runIosExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* runIosExecutor_1() {
        if (os_1.platform() !== 'darwin') {
            throw new Error(`The run-ios build requires Mac to run`);
        }
        const projectRoot = context.workspace.projects[context.projectName].root;
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        if (options.sync) {
            sync_deps_impl_1.displayNewlyAddedDepsMessage(context.projectName, sync_deps_impl_1.syncDeps(context.projectName, projectRoot));
        }
        if (options.install) {
            yield tslib_1.__await(pod_install_task_1.podInstall(path_1.join(projectRoot, 'ios')));
        }
        try {
            const tasks = [runCliRunIOS(context.root, projectRoot, options)];
            if (options.packager && options.xcodeConfiguration !== 'Release') {
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
exports.default = runIosExecutor;
function runCliRunIOS(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        /**
         * Call the react native cli with option `--no-packager`
         * Not passing '--packager' due to cli will launch start command from the project root
         */
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/react-native/cli.js'), ['run-ios', ...createRunIOSOptions(options), '--no-packager'], {
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
function createRunIOSOptions(options) {
    return Object.keys(options).reduce((acc, k) => {
        const v = options[k];
        if (k === 'xcodeConfiguration') {
            acc.push('--configuration', v);
        }
        else if (v && !nxOptions.includes(k)) {
            acc.push(`--${k}`, options[k]);
        }
        return acc;
    }, []);
}
//# sourceMappingURL=run-ios.impl.js.map