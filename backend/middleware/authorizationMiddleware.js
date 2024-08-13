import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/UserSchema.js"

export const verifyJWT = asyncHandler( async (req , res , next) => {
    try{
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer " ,"" )
    
        if(!token){
            throw new ApiError(401 , "unauthorized request")
        }
        else{
            console.log("true")
        }
        const decodedTokenInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findByIdAndUpdate(decodedTokenInfo?._id).select(
            "-password -refreshToken"
        )
        if(!user){
            throw new ApiError(401 , "Access Token invalid" )
        }
        req.user = user
        next()
    }catch(err){
        throw new ApiError(401 , "Access Token invalid" )
        
    }
})