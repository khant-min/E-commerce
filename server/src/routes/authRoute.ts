import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

// all user
router.post("/register", authController.registerCustomer);
router.post("/login", authController.loginCustomer);
router.post("/logout", authController.logoutCustomer);
router.get("/refresh", authController.refreshToken);

// admin
router.post("/admin/login", authController.loginAdmin);
router.post("/admin/logout", authController.logoutAdmin);

export default router;
