import { Router } from "express";
import * as serviceController from "../controllers/serviceController";
import { verifyAdmin, verifyToken } from "../middleware/authHandler";

const router = Router();

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

export default router;
