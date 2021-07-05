"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayNewlyAddedDepsMessage = exports.syncDeps = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const find_all_npm_dependencies_1 = require("../../utils/find-all-npm-dependencies");
const project_graph_1 = require("@nrwl/workspace/src/core/project-graph");
const workspace_1 = require("@nrwl/workspace");
const fileutils_1 = require("@nrwl/workspace/src/utilities/fileutils");
const chalk = require("chalk");
const devkit_1 = require("@nrwl/devkit");
function syncDepsExecutor(options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* syncDepsExecutor_1() {
        const projectRoot = context.workspace.projects[context.projectName].root;
        displayNewlyAddedDepsMessage(context.projectName, syncDeps(context.projectName, projectRoot, options.include));
        yield yield tslib_1.__await({ success: true });
    });
}
exports.default = syncDepsExecutor;
function syncDeps(projectName, projectRoot, include) {
    const graph = project_graph_1.createProjectGraph();
    const npmDeps = find_all_npm_dependencies_1.findAllNpmDependencies(graph, projectName);
    const packageJsonPath = path_1.join(projectRoot, 'package.json');
    const packageJson = workspace_1.readJsonFile(packageJsonPath);
    const newDeps = [];
    const includeDeps = include === null || include === void 0 ? void 0 : include.split(',');
    let updated = false;
    if (!packageJson.dependencies) {
        packageJson.dependencies = {};
        updated = true;
    }
    if (includeDeps) {
        npmDeps.push(...includeDeps);
    }
    npmDeps.forEach((dep) => {
        if (!packageJson.dependencies[dep]) {
            packageJson.dependencies[dep] = '*';
            newDeps.push(dep);
            updated = true;
        }
    });
    if (updated) {
        fileutils_1.writeJsonFile(packageJsonPath, packageJson);
    }
    return newDeps;
}
exports.syncDeps = syncDeps;
function displayNewlyAddedDepsMessage(projectName, deps) {
    if (deps.length > 0) {
        devkit_1.logger.info(`${chalk.bold.cyan('info')} Added entries to 'package.json' for '${projectName}' (for autolink):
  ${deps.map((d) => chalk.bold.cyan(`"${d}": "*"`)).join('\n  ')}`);
    }
    else {
        devkit_1.logger.info(`${chalk.bold.cyan('info')} Dependencies for '${projectName}' are up to date! No changes made.`);
    }
}
exports.displayNewlyAddedDepsMessage = displayNewlyAddedDepsMessage;
//# sourceMappingURL=sync-deps.impl.js.map