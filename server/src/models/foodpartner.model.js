import mongoose, { Schema } from "mongoose";

// create schema
const foodPartnerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    resturantName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true })

// create model and export it
export const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);