"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGitIgnoreEntry = void 0;
const devkit_1 = require("@nrwl/devkit");
const ignore_1 = require("ignore");
const gitignore_entries_1 = require("./gitignore-entries");
function addGitIgnoreEntry(host) {
    var _a;
    if (!host.exists('.gitignore')) {
        devkit_1.logger.warn(`Couldn't find .gitignore file to update`);
        return;
    }
    let content = (_a = host.read('.gitignore')) === null || _a === void 0 ? void 0 : _a.toString('utf-8').trimRight();
    const ig = ignore_1.default();
    ig.add(host.read('.gitignore').toString());
    if (!ig.ignores('apps/example/ios/Pods/Folly')) {
        content = `${content}\n${gitignore_entries_1.gitIgnoreEntriesForReactNative}/\n`;
    }
    // also ignore nested node_modules folders due to symlink for React Native
    if (!ig.ignores('apps/example/node_modules')) {
        content = `${content}\n## Nested node_modules\n\nnode_modules/\n`;
    }
    host.write('.gitignore', content);
}
exports.addGitIgnoreEntry = addGitIgnoreEntry;
//# sourceMappingURL=add-git-ignore-entry.js.map