"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLinting = void 0;
const tslib_1 = require("tslib");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const linter_1 = require("@nrwl/linter");
const devkit_1 = require("@nrwl/devkit");
const react_1 = require("@nrwl/react");
function addLinting(host, projectName, appProjectRoot, tsConfigPaths, linter, setParserOptionsProject) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const lintTask = yield linter_1.lintProjectGenerator(host, {
            linter,
            project: projectName,
            tsConfigPaths,
            eslintFilePatterns: [`${appProjectRoot}/**/*.{ts,tsx,js,jsx}`],
            skipFormat: true,
        });
        if (linter === linter_1.Linter.TsLint) {
            return () => { };
        }
        const reactEslintJson = react_1.createReactEslintJson(appProjectRoot, setParserOptionsProject);
        devkit_1.updateJson(host, devkit_1.joinPathFragments(appProjectRoot, '.eslintrc.json'), (json) => {
            json = reactEslintJson;
            json.ignorePatterns = ['!**/*', 'public', '.cache', 'node_modules'];
            for (const override of json.overrides) {
                if (!override.files || override.files.length !== 2) {
                    continue;
                }
                // for files ['*.tsx', '*.ts'], add rule '@typescript-eslint/ban-ts-comment': 'off'
                if (override.files.includes('*.ts') &&
                    override.files.includes('*.tsx')) {
                    override.rules = override.rules || {};
                    override.rules['@typescript-eslint/ban-ts-comment'] = 'off';
                    continue;
                }
                // for files ['*.js', '*.jsx'], add rule '@typescript-eslint/no-var-requires': 'off'
                if (override.files.includes('*.js') &&
                    override.files.includes('*.jsx')) {
                    override.rules = override.rules || {};
                    override.rules['@typescript-eslint/no-var-requires'] = 'off';
                    continue;
                }
            }
            return json;
        });
        const installTask = yield devkit_1.addDependenciesToPackageJson(host, react_1.extraEslintDependencies.dependencies, react_1.extraEslintDependencies.devDependencies);
        return run_tasks_in_serial_1.runTasksInSerial(lintTask, installTask);
    });
}
exports.addLinting = addLinting;
//# sourceMappingURL=add-linting.js.map