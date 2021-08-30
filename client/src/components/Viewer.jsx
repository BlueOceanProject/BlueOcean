import React, { useState, useEffect, useRef } from 'react';
import Uploader from './Uploader.jsx';
const axios = require('axios');

const Viewer = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", name + Date.now());
    // formData.append("file", selectedFile);

    // axios
    //   .post('http://localhost:3000/upload', formData)
    //   .then((res) => {
    //     alert("File Upload success");
    //   })
    //   .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <Uploader onFileSelectSuccess={(file) => setSelectedFile(file)} onFileSelectError={({ error }) => alert(error)} />

        <button onClick={e => submitForm(e)}>Submit</button>
      </form>
    </div>
  );
}

export default Viewer;