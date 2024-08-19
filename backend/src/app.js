import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "30kb"}))
app.use(express.urlencoded({extended:true , limit: "30kb"}))
app.use(cookieParser())

//routs import
import userRoutes from "../routes/userRoutes.js"
import postRoutes from "../routes/postRoutes.js"

//routes declaration
app.use("/api/v1/users" , userRoutes)
app.use("/api/v1/post" , postRoutes)


export default app