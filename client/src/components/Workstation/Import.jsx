import React, { useState } from 'react';
import axios from 'axios';

const Import = ({ setUploadAudio, setAudioFile, audioFile }) => {

  const [audioURL, setAudioURL] = useState('');
  const [audioObj, setAudioObj] = useState({});

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      const url = window.URL.createObjectURL(blob);
      setAudioURL(url);
      setAudioObj(new Audio(url))
    });
  }

  const importSubmit = (event) => {
    event.preventDefault();
    setAudioFile(audioURL);
    setUploadAudio(audioObj)
  }

  return (
    <div className="import">
      <form className="import-form" onSubmit={importSubmit}>
        <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
        <button type="submit">Import</button>
      </form>
      <audio controls src={audioFile} />
    </div>
  )
}

export default Import;
