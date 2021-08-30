import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import Import from './Import.jsx';

const Workstation = (props) => {
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const start = () => {
    setRecordState(RecordState.START);
  }

  const stop = () => {
    setRecordState(RecordState.STOP);
  }

  const onStop = (audioData) => {
    setAudioData(audioData.url);
    console.log(audioData.url);
  }

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <audio controls src={audioData} />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    <Import />
    </div>
  )
}

export default Workstation;