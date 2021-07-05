"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSymlink = void 0;
const ensure_node_modules_symlink_1 = require("./ensure-node-modules-symlink");
const chalk = require("chalk");
const app_root_1 = require("@nrwl/workspace/src/utils/app-root");
const devkit_1 = require("@nrwl/devkit");
function runSymlink(projectRoot) {
    return () => {
        devkit_1.logger.info(`creating symlinks for ${chalk.bold(projectRoot)}`);
        try {
            ensure_node_modules_symlink_1.ensureNodeModulesSymlink(app_root_1.appRootPath, projectRoot);
        }
        catch (_a) {
            throw new Error(`Failed to create symlinks for ${chalk.bold(projectRoot)}`);
        }
    };
}
exports.runSymlink = runSymlink;
//# sourceMappingURL=symlink-task.js.map