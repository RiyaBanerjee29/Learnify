import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      //whenever u want optimsed searching st this to true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    usertype: {
      type: String,
      enum: ["Caretaker", "Adopter"],
      required: true,
    }, 
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String, // cloudinary url
      //required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

(userSchema.methods.generateAcsessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}),
  (userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  });
export const User = mongoose.model("User", userSchema);
