"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const child_process_1 = require("child_process");
let childProcess;
function detoxBuildExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* detoxBuildExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
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
exports.default = detoxBuildExecutor;
function runCliBuild(workspaceRoot, projectRoot, options) {
    return new Promise((resolve, reject) => {
        childProcess = child_process_1.fork(path_1.join(workspaceRoot, './node_modules/detox/local-cli/cli.js'), ['build', ...createDetoxBuildOptions(options)], {
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
function createDetoxBuildOptions(options) {
    return Object.keys(options).reduce((acc, k) => {
        const v = options[k];
        if (k === 'detoxConfiguration') {
            acc.push('--configuration', v);
        }
        else if (k === 'configPath') {
            acc.push('--config-path', v);
        }
        else
            acc.push(`--${k}`, options[k]);
        return acc;
    }, []);
}
//# sourceMappingURL=build.impl.js.map