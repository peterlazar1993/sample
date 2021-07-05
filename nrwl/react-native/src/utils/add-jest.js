"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJest = void 0;
const tslib_1 = require("tslib");
const jest_1 = require("@nrwl/jest");
function addJest(host, unitTestRunner, projectName, appProjectRoot) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (unitTestRunner !== 'jest') {
            return () => { };
        }
        const jestTask = yield jest_1.jestProjectGenerator(host, {
            project: projectName,
            supportTsx: true,
            skipSerializers: true,
            setupFile: 'none',
            babelJest: true,
        });
        // overwrite the jest.config.js file because react native needs to have special transform property
        const configPath = `${appProjectRoot}/jest.config.js`;
        const content = `module.exports = {
  displayName: '${projectName}',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  transform: {
    '\\\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
    '^.+\\\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      'react-native/jest/assetFileTransformer.js',
    ),
  }
};`;
        host.write(configPath, content);
        return jestTask;
    });
}
exports.addJest = addJest;
//# sourceMappingURL=add-jest.js.map