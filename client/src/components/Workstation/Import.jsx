import React, { useState } from 'react';
import axios from 'axios';

const Import = ({ setUploadAudio, setAudioFile, audioFile }) => {

  // const [file, setFile] = useState('');
  const [audio, setAudio] = useState(null);

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      const url = window.URL.createObjectURL(blob);
      setFile(url);
      props.setUploadAudio(new Audio(url))
    });

  }

  return (
    <div className="import">
        <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
        <audio controls src={audioFile} />
    </div>
  )
}

export default Import;
