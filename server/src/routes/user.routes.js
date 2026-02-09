import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";

// instance of Router
const router = Router();

// routes...
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)

// export router
export default router;