import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user: String,
    email: String,
    password: String
}, {
    timestamps: true
})

const userModel = mongoose.model('usertest', userSchema);

export default userModel;