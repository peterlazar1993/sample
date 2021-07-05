"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const devkit_1 = require("@nrwl/devkit");
function addProject(host, options) {
    devkit_1.addProjectConfiguration(host, options.projectName, {
        root: options.projectRoot,
        sourceRoot: `${options.projectRoot}/src`,
        projectType: 'application',
        targets: Object.assign({}, getTargets(options)),
    });
}
exports.addProject = addProject;
function getTargets(options) {
    const architect = {};
    architect['build-ios'] = {
        executor: '@nrwl/detox:build',
        options: {
            detoxConfiguration: 'ios.sim.debug',
        },
        configurations: {
            production: {
                detoxConfiguration: 'ios.sim.release',
            },
        },
    };
    architect['test-ios'] = {
        executor: '@nrwl/detox:test',
        options: {
            detoxConfiguration: 'ios.sim.debug',
        },
        configurations: {
            production: {
                detoxConfiguration: 'ios.sim.release',
            },
        },
    };
    architect['build-android'] = {
        executor: '@nrwl/detox:build',
        options: {
            detoxConfiguration: 'android.emu.debug',
        },
        configurations: {
            production: {
                detoxConfiguration: 'android.emu.release',
            },
        },
    };
    architect['test-android'] = {
        executor: '@nrwl/detox:test',
        options: {
            detoxConfiguration: 'android.emu.debug',
        },
        configurations: {
            production: {
                detoxConfiguration: 'android.emu.release',
            },
        },
    };
    architect['lint'] = {
        executor: '@nrwl/linter:eslint',
        options: {
            lintFilePatterns: [`${options.projectRoot}/**/*.{js,ts}`],
        },
    };
    return architect;
}
//# sourceMappingURL=add-project.js.map