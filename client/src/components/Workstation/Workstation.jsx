import React, { useState, useEffect } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { Howl, Howler } from 'howler';
import Crunker from 'crunker';
import Import from './Import.jsx';
import Export from './Export.jsx';
import './workstation.css';

var crunker;

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
  const [combinedAudio, setCombinedAudio] = useState(null);

  const toggle = () => {
    if (recordState === null || recordState === RecordState.STOP) {
      setRecordState(RecordState.START);
      if (uploadAudio) {
        uploadAudio.load();
        uploadAudio.play();
      }
      setTimer();
    } else {
      setRecordState(RecordState.STOP);
      if (uploadAudio) {
        uploadAudio.pause();
        uploadAudio.load();
      }
      clearInterval(seekTimer);
      setSeekTime(0);
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

  const setTimer = () => {
    let start = Date.now()
    setSeekTimer(setInterval(() => {
      let difference = Date.now() - start;
      let newSeekTime = seekTime
      setSeekTime(newSeekTime += (Math.round(difference)) / 1000);
    }, 10));
  }

  useEffect(() => {
    if (props.location.state) {
      setAudioFile(props.location.state.url);
      setUploadAudio(new Audio(props.location.state.url));
    }
    crunker = new Crunker({sampleRate: 48000});
  }, [])

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
      setTimer();
    } else {
      clearInterval(seekTimer);
    }
  }, [isMasterPlaying]);

  useEffect(() => {
    if (isThereAudio) {
      if (seekTime >= maxDuration && recordState !== RecordState.START) {
        masterPause();
        clearInterval(seekTimer);
        setSeekTime(maxDuration);
      }
    }
  }, [seekTime])

  const secondsToTimeCode = (seconds) => {
    return `${new Date(seconds * 1000).toISOString().substr(11, 8)}.${Math.round((seekTime % 1) * 100)}`
  }

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
      if (audioFile) { master.importTrack.seek(seekTime) }
      if (recordData) { master.recording.seek(seekTime) }
      masterPause();
    }
  }

  const rewindClick = (event) => {
    if (audioFile) {
      master.importTrack.stop();
      master.importTrack.load();
    }
    if (recordData) {
      master.recording.stop();
      master.recording.load();
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
    if (recordData === null && audioFile === '') {
      alert('must select file or record audio');
    }
    else if (recordData === null) {
      setCombinedAudio(audioFile);
    } else if (audioFile === '') {
      setCombinedAudio(recordData);
    } else {
      crunker.fetchAudio(recordData, audioFile)
        .then(buffers => crunker.mergeAudio(buffers))
        .then(merged => crunker.export(merged, 'audio/mp3'))
        .then((res) => {
          alert('successfully combined audio!');
          // console.log(res);
          setCombinedAudio(res.url);
        })
        .catch((err) => {
          alert('error in combining audio');
        });
    }
  }

  return (
    <div className="workstation-ctr">
      <div className="recorder-ctr">
        <div className="record-btn-ctr">
          <button className="record-btn" onClick={toggle}></button>
          <div className="record-label">Record</div>
        </div>
        <AudioReactRecorder className="recorder" state={recordState} onStop={onStop} />
        <audio className="audio-player record-player" controls src={recordData} onPause={onRecordingPause} onPlay={onRecordingPlay} onEnded={onRecordingEnd} />
      </div>
      <Import setUploadAudio={setUploadAudio}  setAudioFile={setAudioFile} audioFile={audioFile} />
      <div className="master-player-ctr">
        <div className="master-player-controls">
          <button className="master-rewind" onClick={rewindClick}>&#9194;</button>
          {isMasterPlaying ?
          <button className="master-pause-btn" onClick={masterPlayClick}>
            <div className="master-pause-icon"></div>
          </button>
          : <button className="master-play-btn" onClick={masterPlayClick}>
            <div className="master-play-icon"></div>
          </button>
          }
          <button className="master-ff" onClick={ffClick}>&#9193;</button>
        </div>
        {!audioFile && !recordAudio ?
        <div className="no-audio-msg">No audio available. Import a file or make a recording.</div>
        : <div className="no-audio-msg"></div>}
        <div className="seekTime-ctr">
          <div className="seekTime-box">
            <div className="seekTime">{secondsToTimeCode(seekTime)}</div>
          </div>
        </div>
      </div>
      <button className="combine-btn" type="submit" onClick={onSave}>Combine</button>
      <Export uploadAudio={combinedAudio || (uploadAudio && uploadAudio.src) || null} />
    </div>
  )
}

export default Workstation;
