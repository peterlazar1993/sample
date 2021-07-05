"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ensure_node_modules_symlink_1 = require("../../utils/ensure-node-modules-symlink");
function ensureSymlinkExecutor(_, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* ensureSymlinkExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        ensure_node_modules_symlink_1.ensureNodeModulesSymlink(context.root, projectRoot);
        yield yield tslib_1.__await({ success: true });
    });
}
exports.default = ensureSymlinkExecutor;
//# sourceMappingURL=ensure-symlink.impl.js.map