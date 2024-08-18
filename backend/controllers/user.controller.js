import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/UserSchema.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json, response } from "express";
import jwt from "jsonwebtoken";

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
  console.log("email", email);
  console.log("password", password);
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
  // user.accessToken = accessToken;

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
      refreshToken: undefined,
    },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  const decodedeToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  console.log("decoded", decodedeToken); // this gives us hte initial payload that we set

  const user = await User.findById(decodedeToken._id);

  if (!user) {
    throw new ApiError(400, "Invalid Token");
  }
  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    decodedeToken._id
  );

  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", newRefreshToken, option)
    .json(
      new ApiResponse(200, { user }, "Refresh Token Genertaed successfully")
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

   console.log(oldPassword , newPassword)

  const user = await User.findById(req.user?._id);
  const isPasswordCorrecct = await user.isPasswordCorrect(oldPassword);
   console.log("passord correct hai?", isPasswordCorrecct)

  if (!isPasswordCorrecct) {
    throw new ApiError(400, "wrong old password");
  }
  user.password = newPassword;

  const passwordSaved = await user.save({ validateBeforeSave: true });
  console.log("password Save hua?" , passwordSaved)
  if(passwordSaved){
    console.log("return hone wala h")
    return res
    .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"))
    

  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User changed successfully"));
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { usertype, name } = req.body;

  if (!usertype || !name) {
    throw ApiError(400, "All fields are required");
  }
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        usertype,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateAvatar = asyncHandler(async (req, res) => {
     const avatarLocalPath = req.file?.path
     if(!avatarLocalPath){
      throw ApiError(400 , "no avatar file")
     }

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     if(!avatar){
      throw ApiError(400 , " avatar file upload failed on cloudinary")
     }
     await User.findByIdAndUpdate(
      req.user?._id,
      {
              $set:{
                avatar : avatar.url
              }
      },
      {new : true}
     ).select("-password")
     return res
     .status(200)
     .json(new ApiResponse(200 , "Avatar updated"))
});
export {
  registerUser,
  LoginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUser,
  updateAvatar
};
