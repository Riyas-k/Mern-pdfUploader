import { useEffect, useState } from "react";
import { allData, deletePdf, upload } from "../api/config";
import {pdfjs} from 'react-pdf';
import { PdfComp } from "../components/PdfComponent";

interface PdfData {
  _id: string;
  title: string;
  pdf: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Pdf = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [datas, setDatas] = useState<PdfData[]>([]);
    const [pdfFile,setPdfFile] = useState(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (file) {
        const data = await upload(title, file);
        if (data) {
          alert("Pdf Uploaded Successfully");
          setFile(null);
          setTitle("");
          getData();
        } else {
          alert("Some Unexpected Error Occurred. Try again");
        }
      }
    };
  
    const getData = async () => {
      const data = await allData();
      setDatas(data);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    const showPdf = (pdf: string) => {
    //   window.open(`http://localhost:3000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:3000/files/${pdf}`)
    };
  
    const handleDelete = async (id: string) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this PDF?")
      if(isConfirmed){
        const result = await deletePdf(id);
        if (result) getData(); // Refresh data after deletion
      }
      return;
    };
  return (
    <div className="App container">
      <form className="formStyle" onSubmit={handleSubmit}>
        <h4 className="text-center">Upload Pdf</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group pt-2 pb-2">
          <input
            type="file"
            className="form-control-file"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Upload
        </button>
      </form>
      <div className="uploaded pt-4">
        <h4 className="text-center">Uploaded PDF's:</h4>
        <div className="output-div d-flex pt-4 flex-wrap justify-content-center">
          {datas.map((data, index) => (
            <div
              className="card mb-3"
              key={index}
              style={{ minWidth: "18rem" }}
            >
              <div className="card-body">
                <h6 className="card-title text-black text-center">
                  {data.title}
                </h6>
                <button
                  className="btn btn-success btn-sm m-2"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
                <button
                  className="btn btn-danger btn-sm m-2"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  )
}

export default Pdf