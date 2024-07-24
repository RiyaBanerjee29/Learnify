const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnect.js")

connectDb();
const app = express()
app.listen(5000 , () =>{
    console.log("yes server is running....")
})
