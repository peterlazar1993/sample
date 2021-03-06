"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitIgnoreEntriesForReactNative = void 0;
exports.gitIgnoreEntriesForReactNative = `
# React Native

## Xcode

**/ios/**/build/
**/ios/**/*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate

## Android

**/android/**/build/
**/android/**/.gradle
**/android/**/local.properties
**/android/**/*.iml

## BUCK

buck-out/
\\.buckd/
*.keystore
!debug.keystore

## fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/
#
*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

## Bundle artifact
*.jsbundle

## CocoaPods
**/ios/Pods/
`;
//# sourceMappingURL=gitignore-entries.js.map