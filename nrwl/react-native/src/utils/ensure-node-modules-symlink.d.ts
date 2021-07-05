/**
 * This function symlink workspace node_modules folder with app project's node_mdules folder.
 * For yarn and npm, it will symlink the entire node_modules folder.
 * If app project's node_modules already exist, it will remove it first then symlink it.
 * For pnpm, it will go through the package.json' dependencies and devDependencies, and also the required packages listed above.
 * @param workspaceRoot path of the workspace root
 * @param projectRoot path of app project root
 */
export declare function ensureNodeModulesSymlink(workspaceRoot: string, projectRoot: string): void;
