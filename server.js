require('dotenv').config();
const express = require("express");
const app = express();
const userRouter=require("./routes/user.routes");
const indexRouter=require("./routes/index.routes");
//for environmental variable
const dotenv=require("dotenv");

dotenv.config();
//for connecting to db
const connectdb=require("./config/db");
const cookieParser = require("cookie-parser");

connectdb();


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// const mongoose=require('mongoose')

app.set("view engine","ejs");

app.use("/",indexRouter)
app.use("/user",userRouter)

app.listen(2000, () => {
  console.log("server is running on port 2000");
});
