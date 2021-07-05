"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const versions_1 = require("../../utils/versions");
/**
 * Add react-native-codegen due to react-native upgrade.
 * https://react-native-community.github.io/upgrade-helper/?from=0.64.1&to=0.65.0-rc.2
 */
function update(tree) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const installTask = devkit_1.addDependenciesToPackageJson(tree, {}, {
            'react-native-codegen': versions_1.reactNativeCodegenVersion,
        });
        yield devkit_1.formatFiles(tree);
        return installTask;
    });
}
exports.default = update;
//# sourceMappingURL=add-react-native-codegen-dev-dependencies.js.map