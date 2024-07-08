import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)   // ! because we know that there will be string when MONGO_URI is called
        const connection = mongoose.connection

        connection.on('connected', () =>{
            console.log('MongoDB is connected');    
        })

        connection.on('error', (err) =>{
            console.log('MongoDB connection failed, please make sure DB is up and running' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong with the database connection' + error)
    }
}