import { Router } from "express";
import * as analyzeController from "../controllers/analyzeController";
import { verifyAdmin } from "../middleware/authHandler";

const router = Router();

// router.use("/", verifyAdmin);

router.get("/", analyzeController.systemInfo);

export default router;
