"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllNpmDependencies = void 0;
function findAllNpmDependencies(graph, projectName, list = [], seen = new Set()) {
    var _a;
    // In case of bad circular dependencies
    if (seen.has(projectName))
        return list;
    seen.add(projectName);
    const node = graph.nodes[projectName];
    // Don't want to include '@nrwl/react-native' because React Native
    // autolink will warn that the package has no podspec file for iOS.
    if (node.type === 'npm' && node.name !== 'npm:@nrwl/react-native')
        list.push(node.data.packageName);
    (_a = graph.dependencies[projectName]) === null || _a === void 0 ? void 0 : _a.forEach((dep) => findAllNpmDependencies(graph, dep.target, list, seen));
    return list;
}
exports.findAllNpmDependencies = findAllNpmDependencies;
//# sourceMappingURL=find-all-npm-dependencies.js.map