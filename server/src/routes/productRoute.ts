import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

// public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAProduct);
router.get(
  "/categories/:categoryId/related-products",
  productController.getProductByCategory
);

// private
// router.use("/_secure_", verifyAdmin);
router
  .route("/secure")
  .post(productController.createProduct)
  .put(productController.updateProduct);

router.route("/secure/:id").delete(productController.deleteProduct);

export default router;
