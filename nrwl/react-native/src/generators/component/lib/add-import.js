"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImport = void 0;
const ts = require("typescript");
const devkit_1 = require("@nrwl/devkit");
const workspace_1 = require("@nrwl/workspace");
function addImport(source, statement) {
    const allImports = workspace_1.findNodes(source, ts.SyntaxKind.ImportDeclaration);
    if (allImports.length > 0) {
        const lastImport = allImports[allImports.length - 1];
        return [
            {
                type: devkit_1.ChangeType.Insert,
                index: lastImport.end + 1,
                text: `\n${statement}\n`,
            },
        ];
    }
    else {
        return [
            {
                type: devkit_1.ChangeType.Insert,
                index: 0,
                text: `\n${statement}\n`,
            },
        ];
    }
}
exports.addImport = addImport;
//# sourceMappingURL=add-import.js.map