import mongoose from "mongoose";
import dotenv from "dotenv"

export const connect = async() =>{
    const {MONGODB_URI} = process.env
    if(MONGODB_URI){
        return await mongoose.connect(MONGODB_URI)
    }
}