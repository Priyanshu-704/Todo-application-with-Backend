require("dotenv").config()
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const connectDb = async () =>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb;

