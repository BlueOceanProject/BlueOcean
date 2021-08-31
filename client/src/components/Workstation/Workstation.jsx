import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import Import from './Import.jsx';
import Export from './Export.jsx';

const Workstation = (props) => {
  const [recordState, setRecordState] = useState(null);
  const [recordData, setRecordData] = useState(null);
  const [uploadAudio, setUploadAudio] = useState(null);

  const start = () => {
    setRecordState(RecordState.START);
    uploadAudio.play();
  }

  const stop = () => {
    setRecordState(RecordState.STOP);
    console.log(recordState.currentTime);
    uploadAudio.pause();
  }

  const toggle = () => {
    if (recordState === null || recordState === RecordState.STOP) {
      setRecordState(RecordState.START);
      uploadAudio.play();
    } else {
      setRecordState(RecordState.STOP);
      uploadAudio.pause();
      uploadAudio.load();
    }
  }

  const onStop = (audioData) => {
    setRecordData(audioData.url);
  }

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <audio controls src={recordData} />
      <button onClick={toggle}>Start / Stop</button>
      <Import setUploadAudio={setUploadAudio} />
      <Export uploadAudio={uploadAudio} />
    </div>
  )
}

export default Workstation;
