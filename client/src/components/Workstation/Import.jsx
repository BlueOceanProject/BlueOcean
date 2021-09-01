import React, { useState } from 'react';
import axios from 'axios';

const Import = ({ setUploadAudio, setAudioFile, audioFile }) => {

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav'});
      const url = window.URL.createObjectURL(blob);
      setAudioFile(url);
      setUploadAudio(new Audio(url));
    });
  }

  return (
    <div className="import">
      <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
      <audio id="import-audio-el" controls src={audioFile} />
    </div>
  )
}

export default Import;
