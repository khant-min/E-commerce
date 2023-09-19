"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.default = ErrorResponse;
//# sourceMappingURL=errorResponse.js.map