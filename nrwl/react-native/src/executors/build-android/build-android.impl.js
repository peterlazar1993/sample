"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
let childProcess;
function buildAndroidExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* buildAndroidExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        fs_1.chmodSync(path_1.join(projectRoot, 'android', 'gradlew'), 0o775);
        fs_1.chmodSync(path_1.join(projectRoot, 'android', 'gradlew.bat'), 0o775);
        try {
            yield tslib_1.__await(runCliBuild(projectRoot, options));
            yield yield tslib_1.__await({ success: true });
        }
        finally {
            if (childProcess) {
                childProcess.kill();
            }
        }
    });
}
exports.default = buildAndroidExecutor;
function runCliBuild(projectRoot, options) {
    return new Promise((resolve, reject) => {
        childProcess = child_process_1.spawn(process.platform === 'win32' ? 'gradlew.bat' : './gradlew', [options.apk ? 'assembleRelease' : 'bundleRelease'], {
            cwd: path_1.join(projectRoot, 'android'),
            stdio: [0, 1, 2],
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
//# sourceMappingURL=build-android.impl.js.map