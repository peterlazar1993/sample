"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPackagerRunning = void 0;
const tslib_1 = require("tslib");
const fetch = require("node-fetch");
function isPackagerRunning(packagerPort) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield fetch(`http://localhost:${packagerPort}/status`);
            const data = yield resp.text();
            return data === 'packager-status:running' ? 'running' : 'unrecognized';
        }
        catch (_a) {
            return 'not_running';
        }
    });
}
exports.isPackagerRunning = isPackagerRunning;
//# sourceMappingURL=is-packager-running.js.map