"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const child_process_1 = require("child_process");
const workspace_1 = require("@nrwl/workspace");
let childProcess;
function detoxTestExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* detoxTestExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        try {
            yield tslib_1.__await(runCliTest(context.root, projectRoot, options));
            yield yield tslib_1.__await({ success: true });
        }
        finally {
            if (childProcess) {
                childProcess.kill();
            }
        }
    });
}
exports.default = detoxTestExecutor;
function runCliTest(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/detox/local-cli/cli.js'), ['test', ...createDetoxTestOptions(options)], {
            cwd: projectRoot,
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
function createDetoxTestOptions(options) {
    return Object.keys(options).reduce((acc, k) => {
        const propertyName = workspace_1.toFileName(k); // convert camelCase to kebab-case
        const propertyValue = options[k];
        if (k === 'detoxConfiguration') {
            acc.push('--configuration', propertyValue);
        }
        else if (k === 'deviceLaunchArgs') {
            acc.push(`--device-launch-args="${propertyValue}"`); // the value must be specified after an equal sign (=) and inside quotes.
        }
        else if (k === 'appLaunchArgs') {
            acc.push(`--app-launch-argss="${propertyValue}"`); // the value must be specified after an equal sign (=) and inside quotes.
        }
        else {
            acc.push(`--${propertyName}`, propertyValue);
        }
        return acc;
    }, []);
}
//# sourceMappingURL=test.impl.js.map