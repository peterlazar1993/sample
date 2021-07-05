"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChmod = void 0;
const fs_1 = require("fs");
const devkit_1 = require("@nrwl/devkit");
function runChmod(file, mode) {
    return () => {
        devkit_1.logger.info(`chmod ${mode} ${file}`);
        try {
            fs_1.chmodSync(file, mode);
        }
        catch (_a) {
            throw new Error(`chmod failed for ${file}`);
        }
    };
}
exports.runChmod = runChmod;
//# sourceMappingURL=chmod-task.js.map