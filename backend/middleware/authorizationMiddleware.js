import { User } from "../models/UserSchema";
import { ApiError } from "../utils/ApiErrors";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler( async (req , res , next) => {
    try{
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer " ,"" )
    
        if(!token){
            throw new ApiError(401 , "unauthorized request")
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