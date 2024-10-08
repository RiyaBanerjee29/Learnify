import {v2 as cloudinary}  from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const  uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath)   return null
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        console.log("File is successfully uploaded" , res.url)
        return res
    }catch(error){
       return null
    }finally{
        fs.unlinkSync(localFilePath)  //remove the locally saved temp file as the uploaded operation is failed
    }
}
export default uploadOnCloudinary