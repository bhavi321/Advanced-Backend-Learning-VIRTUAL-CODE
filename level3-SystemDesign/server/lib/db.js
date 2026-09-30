import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
    
}
export default connectDB;