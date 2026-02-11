import multer from "multer";

// Configure storage settings for multer
const storage = multer.diskStorage({
    // Define the destination folder where uploaded files will be stored
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); // Files will be saved inside public/temp folder
    },

    // Define the filename format for uploaded files
    filename: (req, file, cb) => {
        // Adding Date.now() to make filename unique and avoid overwriting
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

export const upload = multer({ storage })