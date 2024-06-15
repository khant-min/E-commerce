import { Router } from "express";
import * as supplierController from "../controllers/suppplierController";

const router = Router();

router.get("/", supplierController.getAllSuppliers);
router.post("/", supplierController.createNewSupplier);

export default router;
