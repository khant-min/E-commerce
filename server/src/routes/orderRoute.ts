import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

// router.get("/", orderController.getAllOrders);
router.post("/", orderController.getOrderHistory);
router.post("/", orderController.createAnOrder);

export default router;
