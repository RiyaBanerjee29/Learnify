
import connectDb from "./config/dbConnect.js";
import dotenv from "dotenv";
import app  from "./src/app.js"

dotenv.config({
  path : './.env'
});
connectDb()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log("yes server is running....");
    })
  )
  .catch((err) => {
    console.log("DB connection failed");
  });
