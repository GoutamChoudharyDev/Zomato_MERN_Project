import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/zomato-mern-app`);
        console.log(`Database connected successfully...`);
    } catch (error) {
        console.log("Databasee connection failed", error);
        process.exit(1)
    }
}

export default connectDB;