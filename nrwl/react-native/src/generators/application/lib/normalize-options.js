"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
function normalizeOptions(host, options) {
    const { fileName, className } = devkit_1.names(options.name);
    const directoryName = options.directory
        ? devkit_1.names(options.directory).fileName
        : '';
    const projectDirectory = directoryName
        ? `${directoryName}/${fileName}`
        : fileName;
    const appProjectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const appProjectRoot = `apps/${projectDirectory}`;
    const iosProjectRoot = path_1.join(appProjectRoot, 'ios');
    const androidProjectRoot = path_1.join(appProjectRoot, 'android');
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    const entryFile = path_1.join(host.root, appProjectRoot, '/src/main.tsx');
    /**
     * if options.name is "my-app"
     * name: "my-app", className: 'MyApp', lowerCaseName: 'myapp', displayName: 'MyApp', projectName: 'my-app', appProjectRoot: 'apps/my-app', androidProjectRoot: 'apps/my-app/android', iosProjectRoot: 'apps/my-app/ios'
     * if options.name is "myApp"
     * name: "my-app", className: 'MyApp', lowerCaseName: 'myapp', displayName: 'MyApp', projectName: 'my-app', appProjectRoot: 'apps/my-app', androidProjectRoot: 'apps/my-app/android', iosProjectRoot: 'apps/my-app/ios'
     */
    return Object.assign(Object.assign({}, options), { name: fileName, className, lowerCaseName: className.toLowerCase(), displayName: options.displayName || className, projectName: appProjectName, appProjectRoot,
        iosProjectRoot,
        androidProjectRoot,
        parsedTags,
        entryFile });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map