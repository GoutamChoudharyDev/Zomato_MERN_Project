import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// function to upload a file to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // upload filt to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded successfully
        await fs.unlinkSync(localFilePath)

        return response;
    } catch (error) {
        console.log("Cloudinary upload failded : ", error)

        if (fs.existsSync(localFilePath)) {
            await fs.unlinkSync(localFilePath)
        }
        return null;
    }
}

export { uploadOnCloudinary }