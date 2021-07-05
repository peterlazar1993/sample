"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detoxApplicationSchematic = exports.detoxApplicationGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const run_tasks_in_serial_1 = require("@nrwl/workspace/src/utilities/run-tasks-in-serial");
const init_1 = require("../init/init");
const add_git_ignore_entry_1 = require("./lib/add-git-ignore-entry");
const add_linting_1 = require("./lib/add-linting");
const add_project_1 = require("./lib/add-project");
const create_files_1 = require("./lib/create-files");
const normalize_options_1 = require("./lib/normalize-options");
function detoxApplicationGenerator(host, schema) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const options = normalize_options_1.normalizeOptions(host, schema);
        const initTask = yield init_1.default(host, {
            skipFormat: true,
        });
        create_files_1.createFiles(host, options);
        add_project_1.addProject(host, options);
        add_git_ignore_entry_1.addGitIgnoreEntry(host, options);
        const lintingTask = yield add_linting_1.addLinting(host, options);
        if (!options.skipFormat) {
            yield devkit_1.formatFiles(host);
        }
        return run_tasks_in_serial_1.runTasksInSerial(initTask, lintingTask);
    });
}
exports.detoxApplicationGenerator = detoxApplicationGenerator;
exports.default = detoxApplicationGenerator;
exports.detoxApplicationSchematic = devkit_1.convertNxGenerator(detoxApplicationGenerator);
//# sourceMappingURL=application.js.map