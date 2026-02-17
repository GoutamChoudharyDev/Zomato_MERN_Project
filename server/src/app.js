import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Buil express app...
const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}))

// Middlewares...
app.use(express.json())
app.use(cookieParser())

// Api end points...
import UserRouter from "./routes/user.routes.js";
import FoodPartnerRouter from "./routes/foodpartner.routes.js";
import FoodRouter from "./routes/food.routes.js";

// user routes
app.use("/api/auth/user", UserRouter)
app.use("/api/auth/food-partner", FoodPartnerRouter)
app.use("/api/food", FoodRouter)

// export app
export default app;