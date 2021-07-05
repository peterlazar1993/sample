"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactNativeInitSchematic = exports.updateDependencies = exports.reactNativeInitGenerator = void 0;
const tslib_1 = require("tslib");
const set_default_collection_1 = require("@nrwl/workspace/src/utilities/set-default-collection");
const devkit_1 = require("@nrwl/devkit");
const versions_1 = require("../../utils/versions");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const add_git_ignore_entry_1 = require("./lib/add-git-ignore-entry");
const jest_1 = require("@nrwl/jest");
const detox_1 = require("@nrwl/detox");
function reactNativeInitGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        set_default_collection_1.setDefaultCollection(host, '@nrwl/react-native');
        add_git_ignore_entry_1.addGitIgnoreEntry(host);
        const tasks = [moveDependency(host), updateDependencies(host)];
        if (!schema.unitTestRunner || schema.unitTestRunner === 'jest') {
            const jestTask = jest_1.jestInitGenerator(host, {});
            tasks.push(jestTask);
        }
        if (!schema.e2eTestRunner || schema.e2eTestRunner === 'detox') {
            const detoxTask = yield detox_1.detoxInitGenerator(host, {});
            tasks.push(detoxTask);
        }
        if (!schema.skipFormat) {
            yield devkit_1.formatFiles(host);
        }
        return run_tasks_in_serial_1.runTasksInSerial(...tasks);
    });
}
exports.reactNativeInitGenerator = reactNativeInitGenerator;
function updateDependencies(host) {
    return devkit_1.addDependenciesToPackageJson(host, {
        react: versions_1.reactVersion,
        'react-native': versions_1.reactNativeVersion,
    }, {
        '@nrwl/linter': versions_1.nxVersion,
        '@types/react': versions_1.typesReactVersion,
        '@types/react-native': versions_1.typesReactNativeVersion,
        '@react-native-community/cli': versions_1.reactNativeCommunityCli,
        '@react-native-community/cli-platform-android': versions_1.reactNativeCommunityCliAndroid,
        '@react-native-community/cli-platform-ios': versions_1.reactNativeCommunityCliIos,
        'metro-react-native-babel-preset': versions_1.metroReactNativeBabelPresetVersion,
        '@testing-library/react-native': versions_1.testingLibraryReactNativeVersion,
        '@testing-library/jest-native': versions_1.testingLibraryJestNativeVersion,
        'jest-react-native': versions_1.jestReactNativeVersion,
        metro: versions_1.metroVersion,
        'metro-resolver': versions_1.metroVersion,
        'react-native-codegen': versions_1.reactNativeCodegenVersion,
        'react-test-renderer': versions_1.reactTestRendererVersion,
    });
}
exports.updateDependencies = updateDependencies;
function moveDependency(host) {
    return devkit_1.removeDependenciesFromPackageJson(host, ['@nrwl/react-native'], []);
}
exports.default = reactNativeInitGenerator;
exports.reactNativeInitSchematic = devkit_1.convertNxGenerator(reactNativeInitGenerator);
//# sourceMappingURL=init.js.map