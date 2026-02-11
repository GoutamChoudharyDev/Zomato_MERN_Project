import { Router } from "express";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import { createFood } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// POST : /api/food/ [protected : only foodPartner can add food - middleware]
router.post(
    "/",
    authFoodPartnerMiddleware,
    upload.single("video"),
    createFood
)

export default router;