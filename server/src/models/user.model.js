import mongoose, { Schema } from "mongoose";

// create user schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true })

// create user model and export it
export const User = mongoose.model("User", userSchema);