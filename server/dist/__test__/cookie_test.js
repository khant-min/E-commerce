"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookiesTest = exports.setCookiesTest = void 0;
const authHandler_1 = require("../middleware/authHandler");
const setCookiesTest = (req, res, next) => {
    const refreshToken = (0, authHandler_1.generateToken)({ email: "hi@gmail.com", role: "ADMIN" }, "Refresh", "1d");
    console.log("refresh token: ", refreshToken);
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json("Hi cookies...");
};
exports.setCookiesTest = setCookiesTest;
const getCookiesTest = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.jwt)
        return res.status(404).json({ message: "Cookies are not found" });
    console.log("cookies: ", cookies);
    res.json({ cookies });
};
exports.getCookiesTest = getCookiesTest;
//# sourceMappingURL=cookie_test.js.map