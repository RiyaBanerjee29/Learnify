import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/UserSchema.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAcsessToken();
    const refreshToken = await user.generateRefreshToken();

    //adding refresh token to the DB
    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    }); /*save is the mongoose's object to save the chnages into DB
       validateBeforeSave: false   we used this as if we do directly save() then the fields that are 
       required (eg.password,email) will also need to be passed but here i am just saving the refresh token*/
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong in generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

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
  let response;
  if (!userObject) {
    throw new ApiError(500, "Something went wrong while registering the user");
  } else {
    response = {
      name: userObject.name,
      email: userObject.email,
      usertype: userObject.usertype,
      avatar: userObject.avatar,
      posts: userObject.posts,
    };
  }
  console.log("user created", userObject);
  return res
    .status(201)
    .json(new ApiResponse(201, response, "user registered successfully"));
});

const LoginUser = asyncHandler(async (req, res) => {
  //get data from req
  //email
  //find the user
  //check the password
  //refresh and access token
  // add refresh tomen to the database

  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await User.findOne({ email }); // check if user exists in the database
  // const user1 = User.findOne({
  //   $or : [{username} ,{email}]
  // })
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

  //generating the access and refresh tokens amd stroing into cookies
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  user.refreshToken = refreshToken;
  user.accessToken = accessToken;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
 await User.findByIdAndUpdate(req.user._id, {
    $set: { 
      refreshToken: undefined 
    },
  });
  return res
  .status(200)
  .clearCookie("accessToken",option)
  .clearCookie("refreshToken",option)
  .json(new ApiResponse(200,{},"user logged out"))

});
export { registerUser, LoginUser, logoutUser };
