import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { Howl, Howler } from 'howler';
import Crunker from 'crunker';
import Import from './Import.jsx';

const crunker = new Crunker({sampleRate: 48000});

const Workstation = (props) => {
  const [recordState, setRecordState] = useState(null);
  const [recordData, setRecordData] = useState(null);
  const [recordAudio, setRecordAudio] = useState(null);
  const [uploadAudio, setUploadAudio] = useState(null);
  const [audioFile, setAudioFile] = useState('');
  const [master, setMaster] = useState({});
  const [isMasterPlaying, setMasterPlaying] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [seekTimer, setSeekTimer] = useState('');

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
    let recording = new Howl({
      src: [audioData.url],
      format: ['wav']
    });
    setMaster({ ...master, recording });
    setRecordAudio(new Audio(audioData.url));
  }

  const onPlayerChange = (event) => {
    if (true) {

    }
  }

  useEffect(() => {
    let importTrack = new Howl({
      src: [audioFile],
      format: ['mp3']
    });
    console.log(importTrack)
    setMaster({ ...master, importTrack });
  }, [audioFile])



  useEffect(() => {
    if (isMasterPlaying) {
      let start = Date.now()
      setSeekTimer(setInterval(() => {
        let difference = Date.now() - start;
        let newSeekTime = seekTime
        setSeekTime(newSeekTime += (Math.round(difference)) / 1000);
      }, 10));
    } else {
      clearInterval(seekTimer);
    }
  }, [isMasterPlaying]);

  const masterPlay = (event) => {
    if (!isMasterPlaying) {
      setMasterPlaying(true);
      master.importTrack.play();
      master.recording.play();
    } else {
      setMasterPlaying(false);
      master.importTrack.pause();
      master.recording.pause();
    }
  }

  const onSave = (event) => {
    event.preventDefault();
    crunker.fetchAudio(recordData, audioFile)
      .then(buffers => crunker.mergeAudio(buffers))
      .then(merged => crunker.export(merged, 'audio/mp3'))
      .then(console.log)
      .catch(console.log);
  }

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <button onClick={toggle}>Start / Stop</button>
      {isMasterPlaying ?
      <button onClick={masterPlay}>&#9613;&#9613;</button>
      : <button onClick={masterPlay}>&#9658;</button>
      }
      <div className="seekTime">{seekTime}</div>
      <Import setUploadAudio={setUploadAudio}  setAudioFile={setAudioFile} audioFile={audioFile} />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default Workstation;
