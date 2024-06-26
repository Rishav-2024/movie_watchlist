import mongoose from "mongoose"

// getting mongoDB url from .env file
const url = process.env.MONGODB

// connecting mongoDB
export const connectDB = async ()=>{
    try{
        await mongoose.connect(url)
        console.log("MongoDB is now connected using mongoose");
    }catch(err){
        console.log(err);
    }
} 