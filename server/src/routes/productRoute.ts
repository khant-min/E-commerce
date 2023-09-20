import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

// all user
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAProduct);

// admin
router
  .route("/secure")
  .post(productController.createProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
