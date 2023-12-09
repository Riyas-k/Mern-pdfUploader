import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./mongodb/config.js";
import pdfRouter from "./controllers/pdf-controller.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

//db
connectDb;

app.use("/api", pdfRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
