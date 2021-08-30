import React, { useState } from 'react';
import axios from 'axios';

const Import = () => {

  const [file, setFile] = useState('');

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      setFile(window.URL.createObjectURL(blob));
    });
  }

  const submitFile = (event) => {
    event.preventDefault();
  }

  return (
    <div className="import">

        <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
        <audio controls src={file} />
        <button type="submit">Submit</button>

      {/* <button onClick={playHandler}>Play</button> */}
    </div>
  )
}

export default Import;