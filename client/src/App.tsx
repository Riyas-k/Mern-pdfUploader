import { useState } from "react"


function App() {
 const [title,setTitle] = useState('');
 const [file,setFile] = useState('');

 

  return (
    <>
     <div className="App">
      <form  className="formStyle" onSubmit={handleSubmit}>
        <h4>Upload Pdf</h4>
        <br />
        <input type="text" className="form-control" placeholder="Title" required  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br />
        <input type="file" className="form-control" accept="application/pdf" required value={file} onChange={(e)=>setFile(e.target.value)} />
        <br />
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>
     </div>
    </>
  )
}

export default App
