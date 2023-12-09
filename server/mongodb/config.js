import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URI;

const connectDb = mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

export default connectDb;
