import { Router } from "express";
import * as customerController from "../controllers/customerController";
import { verifyAdmin } from "../middleware/authHandler";

const router = Router();

router.use("/", verifyAdmin);

router.get("/", customerController.getAllCustomers);

export default router;
