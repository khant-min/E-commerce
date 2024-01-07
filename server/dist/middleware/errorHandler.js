"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log("err: ", err);
    res.status(err.status ? err.status : 400).send(err.message);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map