import mongoose from "mongoose"
const Connection = async()=>{
    try {
        await mongoose.connect("mongodb+srv://aditya:aditya@cluster0.jc1akpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to database successfully")
    } catch (error) {
        console.log("Error while connecting to database")
    }
}

export default Connection