"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.podInstall = exports.runPodInstall = void 0;
const child_process_1 = require("child_process");
const os_1 = require("os");
const chalk = require("chalk");
const devkit_1 = require("@nrwl/devkit");
const podInstallErrorMessage = `
Running ${chalk.bold('pod install')} failed, see above.
Do you have CocoaPods (https://cocoapods.org/) installed?

Check that your XCode path is correct:
${chalk.bold('sudo xcode-select --print-path')}

If the path is wrong, switch the path: (your path may be different)
${chalk.bold('sudo xcode-select --switch /Applications/Xcode.app')}
`;
/**
 * Run pod install on current working directory
 * @param cwd current working directory
 * @returns resolve with 0 if not error, reject with error otherwise
 */
function runPodInstall(cwd) {
    return () => {
        if (os_1.platform() !== 'darwin') {
            devkit_1.logger.info('Skipping `pod install` on non-darwin platform');
            return;
        }
        devkit_1.logger.info(`Running \`pod install\` from "${cwd}"`);
        return podInstall(cwd);
    };
}
exports.runPodInstall = runPodInstall;
function podInstall(cwd) {
    return new Promise((resolve, reject) => {
        const process = child_process_1.spawn('pod', ['install'], {
            cwd,
            stdio: [0, 1, 2],
        });
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(podInstallErrorMessage));
            }
        });
        process.on('error', () => {
            reject(new Error(podInstallErrorMessage));
        });
    });
}
exports.podInstall = podInstall;
//# sourceMappingURL=pod-install-task.js.map