import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
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
    age :{
      type : Number,
      require : true
    },
    vaccinated:{
      type : Boolean,
      require : true
    },
    neutered:{
      type : Boolean,
      require : true
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
