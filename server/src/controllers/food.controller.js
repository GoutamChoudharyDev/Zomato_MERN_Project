import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Food } from "../models/food.model.js";

// Create food controller
const createFood = async (req, res) => {
    // get name , description -> req.body
    // get video -> req.file
    // upload video on cloudinary using uploadOnCloudinary function
    // create object in db
    // return success res

    try {
        // Get data(name, description) from frontend
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // Get video from frontend (req.file)
        const video = req.file;

        // Check if video is not exists
        if (!video) {
            return res.status(400).json({
                message: "Video are required"
            })
        }

        // upload on cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(video.path)
        if (!cloudinaryResponse) {
            return res.status(400).json({
                message: "Video uploads failed"
            })
        }

        // create food object
        const food = await Food.create({
            name,
            description,
            video: cloudinaryResponse.secure_url, // save Cloudinary URL
            foodPartner: req.foodPartner._id
        })

        return res.status(201).json({
            message: "Food created successfully",
            food
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

// export
export { createFood }