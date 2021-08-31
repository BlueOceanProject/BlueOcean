import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import Import from './Import.jsx';
import Export from './Export.jsx';
import Crunker from 'crunker';

const crunker = new Crunker({sampleRate: 48000});



const Workstation = (props) => {
  const [recordState, setRecordState] = useState(null);
  const [recordData, setRecordData] = useState(null);
  const [uploadAudio, setUploadAudio] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

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
      uploadAudio.load();
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

  const onRecordingPause = (event) => {
    uploadAudio.pause();
  }

  const onRecordingPlay = (event) => {
    uploadAudio.play();
  }

  const onRecordingEnd = (event) => {
    uploadAudio.load();
  }

  const onSave = (event) => {
    event.preventDefault();
    crunker.fetchAudio(recordData, uploadFile)
      .then(buffers => crunker.mergeAudio(buffers))
      .then(merged => crunker.export(merged, 'audio/mp3'))
      .then(console.log)
      .catch(console.log);
  }

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <audio controls src={recordData} onPause={onRecordingPause} onPlay={onRecordingPlay} onEnded={onRecordingEnd} />
      <button onClick={toggle}>Record / Stop</button>
      <Import setUploadFile={setUploadFile} setUploadAudio={setUploadAudio} />
      <button type="submit" onClick={onSave}>Save</button>
      <Export uploadAudio={uploadAudio} />
    </div>
  )
}

export default Workstation;
