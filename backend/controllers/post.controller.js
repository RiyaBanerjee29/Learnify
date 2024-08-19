import { Post } from "../models/PostSchema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";


const addPost = asyncHandler (async (req, res) => {
    const {name , breed , location , description , isActive ,vaccinated ,age , neutered} = req.body
    const userid = req.user?._id

    console.log(userid)
   console.log(req.body)
    if( [name , breed , location , description , isActive, age, vaccinated , neutered].some((item) => item.trim === "")){
        throw new ApiError(400, "All fields are required")
    }

    let imageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.image) &&
      req.files.image.length > 0
    ) {
      imageLocalPath = req.files?.image[0]?.path;
    }

    
  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const image = await uploadOnCloudinary(imageLocalPath)
  if( !image ){
    throw new ApiError(400, "could not upload file");
  }
  console.log( [name , breed , location , description , isActive ,userid ,  image.url])
  const post = await Post.create({
       name , 
       image : image.url,
       breed,
       location,
       description,
       userid ,
       age,
       neutered,
       vaccinated,
       isActive
  })
  if(!post){
        throw new ApiError(500 , "Could not create new post")
  }
  return res
        .status(200)
        .json(new ApiResponse(201, post, "user registered successfully"))
})
const editPost = asyncHandler ( async (req , res) =>{
    const postId = req.params.postId
    const allowedFields = ['name', 'breed', 'location', 'description', 'isActive', 'vaccinated', 'age', 'neutered'];

    const existingFields = allowedFields.filter(field => req.body.hasOwnProperty(field));
    
    const updatedPostData = {
      ...(existingFields.reduce((acc, field) => ({ ...acc, [field]: req.body[field] }), {}))
    };
    const updatedPost = await Post.findByIdAndUpdate(postId , 
       { $set : updatedPostData}, 
       { new: true }        
    )
    if(!updatedPost){
        throw new ApiError(400 , "cant update post")
    }

console.log(updatedPost)

res.status(200).json(new ApiResponse(200 ,  updatedPost, "Post updated successfully"))
})

const deletePost = asyncHandler (async(req, res) =>{
    const postId = req.params.postId
    const deletedpost = await Post.findByIdAndDelete(postId)
    if(! deletedpost){
         throw new ApiError(400 ,"post not deleted")
    }
    res.status(200).json(new ApiResponse(200 ,  {}, "Post updated successfully"))

})
export {addPost ,editPost , deletePost}