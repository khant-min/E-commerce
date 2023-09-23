import { Router } from "express";
import * as customerController from "../controllers/customerController";

const router = Router();

router.get("/", customerController.getAllCustomers);

export default router;
