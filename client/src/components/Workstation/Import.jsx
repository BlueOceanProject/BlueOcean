import React, { useState } from 'react';
import axios from 'axios';

const Import = ({ setUploadAudio, setAudioFile, audioFile }) => {

  const uploadChange = (event) => {
    event.target.files[0].arrayBuffer().then((data) => {
      const blob = new Blob([data], { type: 'audio/wav' });
      const url = window.URL.createObjectURL(blob);
      setAudioFile(url);
      setUploadAudio(new Audio(url));
    });
  }

  return (
    <div className="import-ctr">
      <input id="fileItem" className="workstation-col-1-3" type="file" title="Upload" onChange={(e) => (uploadChange(e))} />
      <div className="workstation-col-2-3"></div>
      <div className="import-player workstation-col-3-3">
        <div className="audio-player-label">Imported File: </div>
        <audio id="import-audio-el" className="audio-player-work" controls src={audioFile} />
      </div>
    </div>
  )
}

export default Import;
