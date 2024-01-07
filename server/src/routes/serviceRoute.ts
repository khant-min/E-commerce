import { Router } from "express";
import * as serviceController from "../controllers/serviceController";
import { verifyAdmin, verifyToken } from "../middleware/authHandler";
import * as testController from "../__test__/cookie_test";

const router = Router();

// public
router.get("/refresh", serviceController.refreshToken);
// router.post("/get_otp", verifyToken, serviceController.getOTPCode);
// router.post("/verify_otp", verifyToken, serviceController.verifyOTPCode);
// router.post("/reset_password", verifyToken, serviceController.resetPassword);
router.post("/get_otp", serviceController.getOTPCode);
router.post("/verify_otp", serviceController.verifyOTPCode);
router.post("/reset_password", serviceController.resetPassword);

router.post("/set_tokens_test", testController.setCookiesTest);
router.post("/get_tokens_test", testController.getCookiesTest);

// private
// router.use("/_secure_", verifyAdmin);
router.post("/_secure_/new_admin", serviceController.createNewAdmin);

export default router;
