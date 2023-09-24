import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

// public
router.post("/register", authController.registerCustomer);
router.post("/login", authController.loginCustomer);
router.post("/logout", authController.logoutCustomer);

// private
router.post("/admin/login", authController.loginAdmin);
router.post("/admin/logout", authController.logoutAdmin);

export default router;
