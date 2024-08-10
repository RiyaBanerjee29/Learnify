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
  const { name, email, usertype, password } = req.body;
  console.log(name, email, usertype, password);

  if ([name, email, usertype, password].some((field) => field?.trim() === "")) {
    //checking if all fields are there or not
    throw new ApiError(400, "ALl firlds are required");
  }

  //checking if user already exists or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, "User with same email exists");
  }

  //picture upload to cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log("req.files", req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log("Successfully uploaded on cloudinary");

  //creating new user in DB
  const userObject = await User.create({
    name,
    email,
    usertype,
    password,
    avatar: avatar.url,
  });
  if (!userObject) {
    throw new ApiError(500, "Something went wrong while registering the user");
  } else {
    const response = {
      name: userObject.name,
      email: userObject.email,
      usertype: userObject.usertype,
      avatar: userObject.avatar,
      posts: userObject.posts,
    };
    console.log("user created", userObject);
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "user registered successfully"));
});

export { registerUser };
