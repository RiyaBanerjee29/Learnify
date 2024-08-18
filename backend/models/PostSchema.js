import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    postname: {
      type: String,
      require: true,
    },
    postImage: {
      type: String, //cloudinary
    },
    breed: {
      type: String,
      require: true,
    },
    location :{
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      require: true,
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    isActive : {
      type : Boolean
    }
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
