import { FoodPartner } from "../models/foodpartner.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register controller
const registerFoodPartner = async (req, res) => {
    try {
        const { fullName, email, password, resturantName, phoneNumber, address } = req.body;

        if (!fullName?.trim() || !email?.trim() || !password?.trim() || !resturantName?.trim() || !phoneNumber?.trim() || !address?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existedFoodPartner = await FoodPartner.findOne({ email });
        if (existedFoodPartner) {
            return res.status(400).json({ message: "Food partner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await FoodPartner.create({
            fullName,
            email,
            password: hashedPassword,
            resturantName,
            phoneNumber,
            address
        });

        return res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                fullName,
                email,
                resturantName,
                phoneNumber,
                address
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// login controller
const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const foodPartner = await FoodPartner.findOne({ email });
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            foodPartner.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRY }
        );

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
            })
            .json({
                message: "Food partner logged in successfully",
                foodPartner: {
                    _id: foodPartner._id,
                    email: foodPartner.email,
                    fullName: foodPartner.fullName,
                },
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// logout controller
const logoutFoodPartner = async (req, res) => {
    try {
        res.clearCookie("token")

        return res.status(200).json({
            message: "Food partner logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};
