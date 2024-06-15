import { Router } from "express";
import * as categoryController from "../controllers/categoryController";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);

export default router;
