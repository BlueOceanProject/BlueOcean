import React, { useState } from 'react';
import axios from 'axios';

const Import = ({ setUploadAudio, setAudioFile, audioFile }) => {

  // const [file, setFile] = useState('');
  const [audio, setAudio] = useState(null);

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      setAudioFile(window.URL.createObjectURL(blob));
      setUploadAudio(new Audio(window.URL.createObjectURL(blob)))
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
