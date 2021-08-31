import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { Howl, Howler } from 'howler';
import Crunker from 'crunker';
import Import from './Import.jsx';
import Export from './Export.jsx';
import css from './workstation.css';
// import Crunker from 'crunker';

// const crunker = new Crunker({sampleRate: 48000});



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
  const [importTrackDuration, setImportTrackDuration] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);

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
    if (audioFile) {
      let importTrack = new Howl({
        src: [audioFile],
        format: ['mp3']
      });
      setMaster({ ...master, importTrack });
      setIsThereAudio(true);
    }
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

  useEffect(() => {
    if (isThereAudio && seekTime >= maxDuration) {
      masterPause();
      clearInterval(seekTimer);
      setSeekTime(maxDuration);
    }
  }, [seekTime])

  const setDurations = () => {
    let importTrackTime = master.importTrack ? master.importTrack.duration() : 0;
    let recordingTime = master.recording ? master.recording.duration() : 0;
    let maxTime = Math.max(importTrackTime, recordingTime);
    setMaxDuration(maxTime);
    setImportTrackDuration(importTrackTime);
    setRecordingDuration(recordingTime);
    return maxTime;
  }

  const masterPlay = () => {
    if (audioFile) {
      master.importTrack.play();
    }
    if (recordAudio) {
      master.recording.play();
    }
    setDurations();
  }

  const masterPause = () => {
    if (audioFile) {
      master.importTrack.pause();
    }
    if (recordAudio) {
      master.recording.pause();
    }
  }

  const masterPlayClick = (event) => {
    if (!isMasterPlaying) {
      if (isThereAudio) {
        setMasterPlaying(true);
        masterPlay();
      }
    } else {
      setMasterPlaying(false);
      masterPause();
    }
  }

  const rewindClick = (event) => {
    if (audioFile) {
      master.importTrack.stop();
    }
    if (recordAudio) {
      master.recording.stop();
    }
    setSeekTime(0);
    clearInterval(seekTimer);
    setMasterPlaying(false);
  }

  const ffClick = (event) => {
    setSeekTime(setDurations());
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
    crunker.fetchAudio(recordData, audioFile)
      .then(buffers => crunker.mergeAudio(buffers))
      .then(merged => crunker.export(merged, 'audio/mp3'))
      .then(console.log)
      .catch(console.log);
  }

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <button onClick={toggle}>Record / Stop</button>
      <audio controls src={recordData} onPause={onRecordingPause} onPlay={onRecordingPlay} onEnded={onRecordingEnd} />
      <Import setUploadAudio={setUploadAudio}  setAudioFile={setAudioFile} audioFile={audioFile} />
      <div className="master-player-ctr">
        <button className="master-rewind" onClick={rewindClick}>&#9194;</button>
        {isMasterPlaying ?
        <button className="master-pause" onClick={masterPlayClick}>&#9613;&#9613;</button>
        : <button className="master-play" onClick={masterPlayClick}>&#9658;</button>
        }
        <button className="master-ff" onClick={ffClick}>&#9193;</button>
        {!audioFile || !recordAudio ?
        <div className="no-audio-msg">No audio available. Import a file or make a recording.</div>
        : <></>}
      </div>
      <div className="seekTime">{seekTime}</div>
      <button type="submit" onClick={onSave}>Save</button>
      <Export uploadAudio={uploadAudio} />
    </div>
  )
}

export default Workstation;
