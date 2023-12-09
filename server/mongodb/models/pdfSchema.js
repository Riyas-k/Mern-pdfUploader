import mongoose from "mongoose";

const pdfSchema = mongoose.Schema({
  pdf: String,
  title: String,
});

const PDF = mongoose.model("pdfDetails", pdfSchema);

export default PDF;
