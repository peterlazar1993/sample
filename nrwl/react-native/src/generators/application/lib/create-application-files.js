"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationFiles = void 0;
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
function createApplicationFiles(host, options) {
    devkit_1.generateFiles(host, path_1.join(__dirname, '../files/app'), options.appProjectRoot, Object.assign(Object.assign({}, options), { offsetFromRoot: devkit_1.offsetFromRoot(options.appProjectRoot) }));
    if (options.unitTestRunner === 'none') {
        host.delete(path_1.join(options.appProjectRoot, `/src/app/App.spec.tsx`));
    }
    if (options.e2eTestRunner === 'none') {
        host.delete(path_1.join(options.androidProjectRoot, `/app/src/androidTest/java/com/${options.lowerCaseName}/DetoxTest.java`));
    }
    if (options.js) {
        devkit_1.toJS(host);
    }
}
exports.createApplicationFiles = createApplicationFiles;
//# sourceMappingURL=create-application-files.js.map