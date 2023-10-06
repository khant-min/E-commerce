"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.default = router.get("/", (req, res) => {
    res.status(404).send("404 | Not Found");
});
//# sourceMappingURL=notFound.js.map