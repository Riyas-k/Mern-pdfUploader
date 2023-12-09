import express from "express";
import multer from "multer";
import PDF from "../mongodb/models/pdfSchema.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/get-files", async (req, res) => {
  try {
    const data = await PDF.find({});
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const { title } = req.body;
  const { filename } = req.file;
  try {
    await PDF.create({ title: title, pdf: filename });
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

export default router;
