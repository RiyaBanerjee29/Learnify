import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/UserSchema.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * steps for registration:
 * 1. get data from frontend
 * 2. validation of data
 * 3. check if user already exists
 * 4. Check for image
 * 5. upload to cloudinary
 * 6. create user object - create entry in DB
 * 7.  remove password and refresh token in res
 * 8. check if user is successfully created or not
 * 9. return res
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password , usertype } = req.body;
  console.log("email", email);

  if ([email, name, password , usertype].some((item) => item?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    throw new ApiError(409, "User already Exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath, req.files);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file not uploaded");
  }
  const newUser = await User.create({
    email,
    avatar : avatar.url,
    password,
    name 
  })
  const createdUser = User.findById(newUser._id).select(
    "-password  -refreshToken"
  )
  if(!createdUser){
     throw new ApiError(500 , "something went wrong while creating account");
  }
  return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered successfully")
  )
});

export { registerUser };
