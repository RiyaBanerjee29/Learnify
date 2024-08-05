import mongoose from "mongoose";
const connectDb = async () => {
    try {
      const connect = await mongoose.connect(process.env.MONGODB_URL);
      console.log(
        "database connected",
        connect.connection.host,
        connect.connection.name
      );
    } catch (err) {
      console.log("MONGODB CONNECTION ERROR",err);
      process.exit(1);
    }
  }   

export default connectDb
