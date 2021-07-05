"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetox = void 0;
const tslib_1 = require("tslib");
const detox_1 = require("@nrwl/detox");
const linter_1 = require("@nrwl/linter");
function addDetox(host, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ((options === null || options === void 0 ? void 0 : options.e2eTestRunner) !== 'detox') {
            return () => { };
        }
        return detox_1.detoxApplicationGenerator(host, Object.assign(Object.assign({}, options), { linter: linter_1.Linter.EsLint, name: `${options.name}-e2e`, directory: options.directory, project: options.name }));
    });
}
exports.addDetox = addDetox;
//# sourceMappingURL=add-detox.js.map