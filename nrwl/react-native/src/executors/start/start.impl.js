"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCliStart = void 0;
const tslib_1 = require("tslib");
const chalk = require("chalk");
const devkit_1 = require("@nrwl/devkit");
const child_process_1 = require("child_process");
const path_1 = require("path");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
const is_packager_running_1 = require("./lib/is-packager-running");
let childProcess;
function startExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* startExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        try {
            const baseUrl = `http://localhost:${options.port}`;
            const appName = context.projectName;
            devkit_1.logger.info(chalk.cyan(`Packager is ready at ${baseUrl}`));
            devkit_1.logger.info(`Use ${chalk.bold(`nx run-android ${appName}`)} or ${chalk.bold(`nx run-ios ${appName}`)} to run the native app.`);
            yield tslib_1.__await(runCliStart(context.root, projectRoot, options));
            yield yield tslib_1.__await({
                baseUrl,
                success: true,
            });
        }
        finally {
            if (childProcess) {
                childProcess.kill();
            }
        }
    });
}
exports.default = startExecutor;
/*
 * Starts the JS bundler and checks for "running" status before notifying
 * that packager has started.
 */
function runCliStart(workspaceRoot, projectRoot, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield is_packager_running_1.isPackagerRunning(options.port);
        if (result === 'running') {
            devkit_1.logger.info('JS server already running.');
        }
        else if (result === 'unrecognized') {
            devkit_1.logger.warn('JS server not recognized.');
        }
        else {
            // result === 'not_running'
            devkit_1.logger.info('Starting JS server...');
            try {
                yield startAsync(workspaceRoot, projectRoot, options);
            }
            catch (error) {
                devkit_1.logger.error(`Failed to start the packager server. Error details: ${error.message}`);
                throw error;
            }
        }
    });
}
exports.runCliStart = runCliStart;
function startAsync(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/react-native/cli.js'), ['start', ...createStartOptions(options)], { cwd: projectRoot });
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
function createStartOptions(options) {
    return Object.keys(options).reduce((acc, k) => {
        if (k === 'resetCache') {
            acc.push(`--reset-cache`);
        }
        else {
            acc.push(`--${k}`, options[k]);
        }
        return acc;
    }, []);
}
//# sourceMappingURL=start.impl.js.map