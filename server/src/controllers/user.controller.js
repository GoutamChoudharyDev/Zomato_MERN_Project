import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// register controller
const registerUser = async (req, res) => {
    try {
        // take data from frontend through req.body
        const { fullName, email, password } = req.body;

        // validate : check all fields are present or not
        if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check if user already exist
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(409).json({
                message: "User already exist"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user object
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        const createdUser = await User.findById(user._id).select("-password")

        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while register user"
            })
        }

        // return success 
        return res.status(201).json({
            message: "User register successfully",
            user: createdUser
        })

    } catch (error) {
        console.log("register error : ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

// login controller
const loginUser = async (req, res) => {
    try {
        // get user data from frontend 
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // find user
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Register first"
            })
        }

        // check password 
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password does not match"
            })
        }

        // generate token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )

        // store token in cookies
        res.cookie("token", token)

        return res.status(200).json({
            message: "user logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })

    } catch (error) {
        console.log("logged in error : ", error);
        return res.status(500).json({
            message: "Internal server errro"
        })
    }
}

// logout controller
const logoutUser = async (req, res) => {
    res.clearCookie("token")

    return res.status(200).json({
        message: "User logged out successfully"
    })
}

// exports...
export {
    registerUser,
    loginUser,
    logoutUser
}