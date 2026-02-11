import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: Schema.Types.ObjectId,
        ref: "FoodPartner",
        required: true
    }
}, { timestamps: true })

export const Food = mongoose.model("Food", foodSchema)