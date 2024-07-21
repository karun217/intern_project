import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"




const app = express()
dotenv.config()

const connect = async() => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected" , ()=>{
    console.log("mongoDB connected")
})


//creating middlewares  -> its able to reach our requests and response ,  before sending anything to users


//because to write directly in json in insomnia


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" ,authRoute);
app.use("/api/hotels" ,hotelsRoute);
app.use("/api/rooms" ,roomsRoute);
app.use("/api/users" ,usersRoute);


//error handling -> best practice
app.use((err , req, res , next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack ,          //it goes more detail about our error 
    })

    
})






app.listen(8800 , ()=>{
    connect()
    console.log("connected to backend")
})