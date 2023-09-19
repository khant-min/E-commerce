"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(err.status).send(err.message);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map