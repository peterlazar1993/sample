"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const devkit_1 = require("@nrwl/devkit");
function addProject(host, options) {
    const nxConfig = {
        tags: options.parsedTags,
    };
    const project = {
        root: options.appProjectRoot,
        sourceRoot: `${options.appProjectRoot}/src`,
        projectType: 'application',
        targets: Object.assign({}, getTargets(options)),
    };
    devkit_1.addProjectConfiguration(host, options.projectName, Object.assign(Object.assign({}, project), nxConfig));
    const workspace = devkit_1.readWorkspaceConfiguration(host);
    if (!workspace.defaultProject) {
        workspace.defaultProject = options.projectName;
        devkit_1.updateWorkspaceConfiguration(host, workspace);
    }
}
exports.addProject = addProject;
function getTargets(options) {
    const architect = {};
    architect.start = {
        executor: '@nrwl/react-native:start',
        options: {
            port: 8081,
        },
    };
    architect.serve = {
        executor: '@nrwl/workspace:run-commands',
        options: {
            command: `nx start ${options.name}`,
        },
    };
    architect['run-ios'] = {
        executor: '@nrwl/react-native:run-ios',
        options: {},
    };
    architect['bundle-ios'] = {
        executor: '@nrwl/react-native:bundle',
        outputs: [`${options.appProjectRoot}/build`],
        options: {
            entryFile: `${options.appProjectRoot}/src/main.tsx`,
            platform: 'ios',
            bundleOutput: `dist/${options.appProjectRoot}/ios/main.bundle`,
        },
    };
    architect['run-android'] = {
        executor: '@nrwl/react-native:run-android',
        options: {},
    };
    architect['build-android'] = {
        executor: '@nrwl/react-native:build-android',
        outputs: [
            `${options.appProjectRoot}/android/app/build/outputs/bundle`,
            `${options.appProjectRoot}/android/app/build/outputs/apk`,
        ],
        options: {},
    };
    architect['bundle-android'] = {
        executor: '@nrwl/react-native:bundle',
        options: {
            entryFile: `${options.appProjectRoot}/src/main.tsx`,
            platform: 'android',
            bundleOutput: `dist/${options.appProjectRoot}/android/main.bundle`,
        },
    };
    architect['sync-deps'] = {
        executor: '@nrwl/react-native:sync-deps',
        options: {},
    };
    architect['ensure-symlink'] = {
        executor: '@nrwl/react-native:ensure-symlink',
        options: {},
    };
    return architect;
}
//# sourceMappingURL=add-project.js.map