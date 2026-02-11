import { FoodPartner } from "../models/foodpartner.model.js"
import jwt from "jsonwebtoken"

const authFoodPartnerMiddleware = async (req, res, next) => {
    try {
        // 1. get token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            })
        }

        // 2. verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        // 3. find food partner
        const foodPartner = await FoodPartner.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({
                message: "Unauthorized access",
            });
        }

        // 4. attach partner to request
        req.foodPartner = foodPartner;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

export {
    authFoodPartnerMiddleware,
}