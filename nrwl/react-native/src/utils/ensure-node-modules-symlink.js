"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureNodeModulesSymlink = void 0;
const path_1 = require("path");
const os_1 = require("os");
const fs = require("fs");
const workspace_1 = require("@nrwl/workspace");
const chalk = require("chalk");
const requiredPackages = [
    'react-native',
    'jsc-android',
    '@react-native-community/cli-platform-ios',
    '@react-native-community/cli-platform-android',
    'hermes-engine',
    '@nrwl/react-native',
    '@babel/runtime',
];
/**
 * This function symlink workspace node_modules folder with app project's node_mdules folder.
 * For yarn and npm, it will symlink the entire node_modules folder.
 * If app project's node_modules already exist, it will remove it first then symlink it.
 * For pnpm, it will go through the package.json' dependencies and devDependencies, and also the required packages listed above.
 * @param workspaceRoot path of the workspace root
 * @param projectRoot path of app project root
 */
function ensureNodeModulesSymlink(workspaceRoot, projectRoot) {
    const worksapceNodeModulesPath = path_1.join(workspaceRoot, 'node_modules');
    if (!fs.existsSync(worksapceNodeModulesPath)) {
        throw new Error(`Cannot find ${worksapceNodeModulesPath}`);
    }
    const appNodeModulesPath = path_1.join(projectRoot, 'node_modules');
    // `mklink /D` requires admin privilege in Windows so we need to use junction
    const symlinkType = os_1.platform() === 'win32' ? 'junction' : 'dir';
    if (fs.existsSync(appNodeModulesPath)) {
        fs.rmdirSync(appNodeModulesPath, { recursive: true });
    }
    fs.symlinkSync(worksapceNodeModulesPath, appNodeModulesPath, symlinkType);
    if (isPnpm(workspaceRoot)) {
        symlinkPnpm(workspaceRoot, appNodeModulesPath, symlinkType);
    }
}
exports.ensureNodeModulesSymlink = ensureNodeModulesSymlink;
function isPnpm(workspaceRoot) {
    const pnpmDir = path_1.join(workspaceRoot, 'node_modules/.pnpm');
    return fs.existsSync(pnpmDir);
}
function symlinkPnpm(workspaceRoot, appNodeModulesPath, symlinkType) {
    const worksapcePackageJsonPath = path_1.join(workspaceRoot, 'package.json');
    const workspacePackageJson = workspace_1.readJsonFile(worksapcePackageJsonPath);
    const workspacePackages = Object.keys(Object.assign(Object.assign({}, workspacePackageJson.dependencies), workspacePackageJson.devDependencies));
    const packagesToSymlink = new Set([
        ...workspacePackages,
        ...requiredPackages,
    ]);
    workspace_1.createDirectory(appNodeModulesPath);
    packagesToSymlink.forEach((p) => {
        const dir = path_1.join(appNodeModulesPath, p);
        if (!fs.existsSync(dir)) {
            if (isScopedPackage(p))
                workspace_1.createDirectory(path_1.join(appNodeModulesPath, getScopedData(p).scope));
            fs.symlinkSync(locateNpmPackage(workspaceRoot, p), dir, symlinkType);
        }
        if (!fs.existsSync(path_1.join(dir, 'package.json'))) {
            throw new Error(`Invalid symlink ${chalk.bold(dir)}. Remove ${chalk.bold(appNodeModulesPath)} and try again.`);
        }
    });
}
function locateNpmPackage(workspaceRoot, packageName) {
    const pnpmDir = path_1.join(workspaceRoot, 'node_modules/.pnpm');
    let candidates;
    if (isScopedPackage(packageName)) {
        const { scope, name } = getScopedData(packageName);
        candidates = fs
            .readdirSync(pnpmDir)
            .filter((f) => f.startsWith(`${scope}+${name}`) &&
            fs.lstatSync(path_1.join(pnpmDir, f)).isDirectory());
    }
    else {
        candidates = fs
            .readdirSync(pnpmDir)
            .filter((f) => f.startsWith(packageName) &&
            fs.lstatSync(path_1.join(pnpmDir, f)).isDirectory());
    }
    if (candidates.length === 0) {
        throw new Error(`Could not locate pnpm directory for ${packageName}`);
    }
    else if (candidates.length === 1) {
        return path_1.join(pnpmDir, candidates[0], 'node_modules', packageName);
    }
    else {
        const packageJson = workspace_1.readJsonFile(path_1.join(workspaceRoot, 'package.json'));
        const deps = Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies);
        const version = deps[packageName];
        const found = candidates.find((c) => c.includes(version));
        if (found) {
            return path_1.join(pnpmDir, found, 'node_modules', packageName);
        }
        else {
            throw new Error(`Cannot find ${packageName}@${version}. Install it with 'pnpm install --save ${packageName}@${version}'.`);
        }
    }
}
function isScopedPackage(p) {
    return p.startsWith('@');
}
function getScopedData(p) {
    const [scope, name] = p.split('/');
    return { scope, name };
}
//# sourceMappingURL=ensure-node-modules-symlink.js.map