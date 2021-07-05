"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLib = exports.createApp = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const application_1 = require("../generators/application/application");
const linter_1 = require("@nrwl/linter");
function createApp(tree, appName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield application_1.default(tree, {
            linter: linter_1.Linter.EsLint,
            skipFormat: true,
            style: 'css',
            unitTestRunner: 'none',
            name: appName,
            e2eTestRunner: 'none',
        });
    });
}
exports.createApp = createApp;
function createLib(tree, libName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { fileName } = devkit_1.names(libName);
        tree.write(`/libs/${fileName}/src/index.ts`, `import React from 'react';\n`);
        devkit_1.addProjectConfiguration(tree, fileName, {
            tags: [],
            root: `libs/${fileName}`,
            projectType: 'library',
            sourceRoot: `libs/${fileName}/src`,
            targets: {},
        });
    });
}
exports.createLib = createLib;
//# sourceMappingURL=testing-generators.js.map