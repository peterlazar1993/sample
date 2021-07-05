"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detoxInitSchematic = exports.updateDependencies = exports.detoxInitGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const versions_1 = require("@nrwl/jest/src/utils/versions");
const versions_2 = require("../../utils/versions");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
function detoxInitGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const tasks = [moveDependency(host), updateDependencies(host)];
        if (!schema.skipFormat) {
            yield devkit_1.formatFiles(host);
        }
        return run_tasks_in_serial_1.runTasksInSerial(...tasks);
    });
}
exports.detoxInitGenerator = detoxInitGenerator;
function updateDependencies(host) {
    return devkit_1.addDependenciesToPackageJson(host, {}, {
        '@nrwl/detox': versions_2.nxVersion,
        detox: versions_2.detoxVersion,
        '@types/detox': versions_2.typesDetoxVersion,
        '@testing-library/jest-dom': versions_2.testingLibraryJestDom,
        'jest-circus': versions_1.jestVersion,
    });
}
exports.updateDependencies = updateDependencies;
function moveDependency(host) {
    return devkit_1.removeDependenciesFromPackageJson(host, ['@nrwl/detox'], []);
}
exports.default = detoxInitGenerator;
exports.detoxInitSchematic = devkit_1.convertNxGenerator(detoxInitGenerator);
//# sourceMappingURL=init.js.map