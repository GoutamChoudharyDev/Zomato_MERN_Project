// import and config dotenv
import dotenv from "dotenv"
dotenv.config();

// import statemenets
import app from "./app.js";
import connectDB from "./db/db.js";

// call connectDB function
connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("database error : ", error);
    })