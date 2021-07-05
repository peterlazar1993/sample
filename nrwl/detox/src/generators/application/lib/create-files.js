"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles = void 0;
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
function createFiles(host, options) {
    devkit_1.generateFiles(host, path_1.join(__dirname, '../files/app'), options.projectRoot, Object.assign(Object.assign({}, options), { offsetFromRoot: devkit_1.offsetFromRoot(options.projectRoot) }));
    if (options.js) {
        devkit_1.toJS(host);
    }
}
exports.createFiles = createFiles;
//# sourceMappingURL=create-files.js.map