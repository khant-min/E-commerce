import { Router } from "express";
import * as serviceController from "../controllers/serviceController";
import { verifyAdmin } from "../middleware/authHandler";

const router = Router();

// public
router.post("/refresh", serviceController.refreshToken);

// private
router.use("/secure", verifyAdmin);
router.post("/secure/newAdmin", serviceController.createNewAdmin);

export default router;
