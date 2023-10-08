"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController = __importStar(require("../controllers/serviceController"));
const router = (0, express_1.Router)();
// public
router.post("/refresh", serviceController.refreshToken);
// router.post("/get_otp", verifyToken, serviceController.getOTPCode);
// router.post("/verify_otp", verifyToken, serviceController.verifyOTPCode);
// router.post("/reset_password", verifyToken, serviceController.resetPassword);
router.post("/get_otp", serviceController.getOTPCode);
router.post("/verify_otp", serviceController.verifyOTPCode);
router.post("/reset_password", serviceController.resetPassword);
// private
// router.use("/_secure_", verifyAdmin);
router.post("/_secure_/new_admin", serviceController.createNewAdmin);
exports.default = router;
//# sourceMappingURL=serviceRoute.js.map