"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLinting = void 0;
const tslib_1 = require("tslib");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const linter_1 = require("@nrwl/linter");
const devkit_1 = require("@nrwl/devkit");
const react_1 = require("@nrwl/react");
function addLinting(host, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const lintTask = yield linter_1.lintProjectGenerator(host, {
            linter: options.linter,
            project: options.projectName,
            tsConfigPaths: [
                devkit_1.joinPathFragments(options.projectRoot, 'tsconfig.app.json'),
            ],
            eslintFilePatterns: [`${options.projectRoot}/**/*.{ts,tsx,js,jsx}`],
            skipFormat: true,
        });
        if (options.linter === linter_1.Linter.TsLint) {
            return () => { };
        }
        const reactEslintJson = react_1.createReactEslintJson(options.projectRoot, options.setParserOptionsProject);
        devkit_1.updateJson(host, devkit_1.joinPathFragments(options.projectRoot, '.eslintrc.json'), () => reactEslintJson);
        const installTask = yield devkit_1.addDependenciesToPackageJson(host, react_1.extraEslintDependencies.dependencies, react_1.extraEslintDependencies.devDependencies);
        return run_tasks_in_serial_1.runTasksInSerial(lintTask, installTask);
    });
}
exports.addLinting = addLinting;
//# sourceMappingURL=add-linting.js.map