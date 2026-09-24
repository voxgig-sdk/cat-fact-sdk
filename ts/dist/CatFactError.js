"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatFactError = void 0;
class CatFactError extends Error {
    isCatFactError = true;
    sdk = 'CatFact';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CatFactError = CatFactError;
//# sourceMappingURL=CatFactError.js.map