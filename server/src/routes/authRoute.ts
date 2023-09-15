import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.registerCustomer);
router.post("/login", authController.loginCustomer);
router.post("/logout", authController.logoutCustomer);

export default router;
