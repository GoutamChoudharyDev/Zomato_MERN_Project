import { Router } from "express";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import { createFood, getFood } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// POST : /api/food/ [protected : only foodPartner can add food - middleware]
router.post(
    "/",
    authFoodPartnerMiddleware, // middleware for food partner
    upload.single("video"),
    createFood // controller
)

// GET : /api/food [protected]
router.get(
    "/", //route
    authUserMiddleware, // middleware
    getFood, // controller
)

export default router;