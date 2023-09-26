import { Router } from "express";
import * as serviceController from "../controllers/serviceController";
import { verifyAdmin, verifyToken } from "../middleware/authHandler";

const router = Router();

// public
router.post("/refresh", serviceController.refreshToken);
router.post("/getOTPCode", verifyToken, serviceController.getOTPCode);
router.post("/resetPassword", verifyToken, serviceController.resetPassword);

// private
router.use("/secure", verifyAdmin);
router.post("/secure/newAdmin", serviceController.createNewAdmin);

export default router;
