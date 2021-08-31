import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { Howl, Howler } from 'howler';
import Crunker from 'crunker';
import Import from './Import.jsx';
import Export from './Export.jsx';
import css from './workstation.css';

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
  const [isThereAudio, setIsThereAudio] = useState(false);
  const [maxTime, setMaxTime] = useState(0);

  const toggle = () => {
    if (recordState === null || recordState === RecordState.STOP) {
      setRecordState(RecordState.START);
      uploadAudio.play();
    } else {
      setRecordState(RecordState.STOP);
      uploadAudio.pause();
      uploadAudio.load();
      console.log(recordData)
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
    setMaster({ ...master, importTrack });
    setIsThereAudio(true);
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
      if (isThereAudio) {
        setSeekTime(master.importTrack._sounds[0]._seek)
      }
    }
  }, [isMasterPlaying]);

  const masterPlay = (event) => {
    if (!isMasterPlaying) {
      if (isThereAudio) {
        setMasterPlaying(true);
        master.importTrack.play();
        master.recording.play();
      }
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
      <div className="master-player-ctr">
        <button className="master-rewind">&#9194;</button>
        {isMasterPlaying ?
        <button className="master-pause" onClick={masterPlay}>&#9613;&#9613;</button>
        : <button className="master-play" onClick={masterPlay}>&#9658;</button>
        }
        <button className="master-ff">&#9193;</button>
        {!isThereAudio ?
        <div className="no-audio-msg">No audio available. Import a file or make a recording.</div>
        : <></>}
    </div>
      <div className="seekTime">{seekTime}</div>
      <Import setUploadAudio={setUploadAudio}  setAudioFile={setAudioFile} audioFile={audioFile} />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default Workstation;
