"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactNativeApplicationSchematic = exports.reactNativeApplicationGenerator = void 0;
const tslib_1 = require("tslib");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const pod_install_task_1 = require("../../utils/pod-install-task");
const chmod_task_1 = require("../../utils/chmod-task");
const symlink_task_1 = require("../../utils/symlink-task");
const add_linting_1 = require("../../utils/add-linting");
const add_jest_1 = require("../../utils/add-jest");
const devkit_1 = require("@nrwl/devkit");
const normalize_options_1 = require("./lib/normalize-options");
const init_1 = require("../init/init");
const path_1 = require("path");
const add_project_1 = require("./lib/add-project");
const create_application_files_1 = require("./lib/create-application-files");
const add_detox_1 = require("./lib/add-detox");
function reactNativeApplicationGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const options = normalize_options_1.normalizeOptions(host, schema);
        create_application_files_1.createApplicationFiles(host, options);
        add_project_1.addProject(host, options);
        const initTask = yield init_1.default(host, Object.assign(Object.assign({}, options), { skipFormat: true }));
        const lintTask = yield add_linting_1.addLinting(host, options.projectName, options.appProjectRoot, [devkit_1.joinPathFragments(options.appProjectRoot, 'tsconfig.app.json')], options.linter, options.setParserOptionsProject);
        const jestTask = yield add_jest_1.addJest(host, options.unitTestRunner, options.projectName, options.appProjectRoot);
        const detoxTask = yield add_detox_1.addDetox(host, options);
        const symlinkTask = symlink_task_1.runSymlink(options.appProjectRoot);
        const podInstallTask = pod_install_task_1.runPodInstall(options.iosProjectRoot);
        const chmodTaskGradlew = chmod_task_1.runChmod(path_1.join(options.androidProjectRoot, 'gradlew'), 0o775);
        const chmodTaskGradlewBat = chmod_task_1.runChmod(path_1.join(options.androidProjectRoot, 'gradlew.bat'), 0o775);
        if (!options.skipFormat) {
            yield devkit_1.formatFiles(host);
        }
        return run_tasks_in_serial_1.runTasksInSerial(initTask, lintTask, jestTask, detoxTask, symlinkTask, podInstallTask, chmodTaskGradlew, chmodTaskGradlewBat);
    });
}
exports.reactNativeApplicationGenerator = reactNativeApplicationGenerator;
exports.default = reactNativeApplicationGenerator;
exports.reactNativeApplicationSchematic = devkit_1.convertNxGenerator(reactNativeApplicationGenerator);
//# sourceMappingURL=application.js.map