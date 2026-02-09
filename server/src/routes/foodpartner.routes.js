import { Router } from "express";
import { loginFoodPartner, logoutFoodPartner, registerFoodPartner } from "../controllers/foodpartner.controller.js";

const router = Router();

router.post("/register", registerFoodPartner)
router.post("/login", loginFoodPartner)
router.get("/logout", logoutFoodPartner)

export default router;