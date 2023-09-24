import { Router } from "express";
import * as productController from "../controllers/productController";
import { verifyAdmin } from "../middleware/authHandler";

const router = Router();

// public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAProduct);

// private
router.use("/secure", verifyAdmin);

router
  .route("/secure")
  .post(productController.createProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
