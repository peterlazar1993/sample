"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("@nrwl/workspace");
const versions_1 = require("../../utils/versions");
function update() {
    return workspace_1.addDepsToPackageJson({}, {
        '@react-native-community/cli': versions_1.reactNativeCommunityCli,
        '@react-native-community/cli-platform-android': versions_1.reactNativeCommunityCliAndroid,
        metro: versions_1.metroVersion,
        'metro-resolver': versions_1.metroVersion,
    });
}
exports.default = update;
//# sourceMappingURL=add-missing-dev-dependencies-11-4-0.js.map