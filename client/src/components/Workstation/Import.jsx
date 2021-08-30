import React, { useState } from 'react';
import axios from 'axios';

const Import = (props) => {

  const [file, setFile] = useState('');
  const [audio, setAudio] = useState(null);

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      setFile(window.URL.createObjectURL(blob));
      props.setUploadAudio(new Audio(window.URL.createObjectURL(blob)))
    });
  }

  return (
    <div className="import">

        <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
        <audio controls src={file} />
    </div>
  )
}

export default Import;