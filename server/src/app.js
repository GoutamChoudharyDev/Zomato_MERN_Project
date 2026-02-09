import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Buil express app...
const app = express();

// Enable CORS
app.use(cors())

// Middlewares...
app.use(express.json())
app.use(cookieParser())

// Api end points...
import UserRouter from "./routes/user.routes.js";
import FoodPartnerRouter from "./routes/foodpartner.routes.js"

// user routes
app.use("/api/auth/user", UserRouter)
app.use("/api/auth/food-partner", FoodPartnerRouter)

// export app
export default app;