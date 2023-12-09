import { useState } from "react";
import { upload } from "./api/config";

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(title,file);
    const data = await upload(title, file)
  };

  return (
    <>
      <div className="App">
        <form className="formStyle" onSubmit={handleSubmit}>
          <h4>Upload Pdf</h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
