"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
const executor_options_utils_1 = require("@nrwl/workspace/src/utilities/executor-options-utils");
const require_jest_config_1 = require("@nrwl/jest/src/migrations/update-10-0-0/require-jest-config");
/**
 * This function update jest.config.js and test.setup.ts for react native project for Jest 27.
 * Inside jest.config.js, remove ...workspacePreset because it has testEnvironment set as jsdom.
 * Just set preset as react-native is sufficient.
 * Also remove the jest.useFakeTimers() in test.setup.ts.
 */
function updateJestConfig(tree) {
    executor_options_utils_1.forEachExecutorOptions(tree, '@nrwl/jest:jest', (options, project) => {
        if (!options.jestConfig) {
            return;
        }
        const jestConfigPath = options.jestConfig;
        const jestConfig = require_jest_config_1.getJestObject(path_1.join(tree.root, jestConfigPath));
        const testEnvironment = jestConfig.testEnvironment;
        const preset = jestConfig.preset;
        if (testEnvironment === 'node' || preset !== 'react-native') {
            return;
        }
        try {
            const contents = tree.read(jestConfigPath, 'utf-8');
            tree.write(jestConfigPath, contents
                .replace(`...workspacePreset,`, '')
                .replace(`const workspacePreset = require('../../jest.preset');`, ''));
        }
        catch (_a) {
            devkit_1.logger.error(devkit_1.stripIndents `Unable to update jest.config.js for project ${project}.`);
        }
        try {
            const { root } = devkit_1.readProjectConfiguration(tree, project);
            const setupTestPath = path_1.join(root, 'test-setup.ts');
            if (tree.exists(setupTestPath)) {
                const contents = tree.read(setupTestPath, 'utf-8');
                tree.write(setupTestPath, contents
                    .replace(`jest.useFakeTimers();`, '')
                    .replace(`import { jest } from '@jest/globals';`, ''));
            }
        }
        catch (_b) {
            devkit_1.logger.error(devkit_1.stripIndents `Unable to update test-setup.ts for project ${project}.`);
        }
    });
}
function update(tree) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        updateJestConfig(tree);
        yield devkit_1.formatFiles(tree);
    });
}
exports.default = update;
//# sourceMappingURL=update-jest-for-react-native.js.map