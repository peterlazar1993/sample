"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGitIgnoreEntry = void 0;
const devkit_1 = require("@nrwl/devkit");
function addGitIgnoreEntry(host, options) {
    if (host.exists('.gitignore')) {
        let content = host.read('.gitignore', 'utf-8');
        content = `${content}\n${options.projectRoot}/artifacts\n`;
        host.write('.gitignore', content);
    }
    else {
        devkit_1.logger.warn(`Couldn't find .gitignore file to update`);
    }
}
exports.addGitIgnoreEntry = addGitIgnoreEntry;
//# sourceMappingURL=add-git-ignore-entry.js.map