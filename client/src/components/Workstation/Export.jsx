import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../App.jsx';

const Export = (props) => {
  const [songName, setSongName] = useState('');
  const userContext = useContext(GlobalContext);
  const id = userContext.state.userId;

  const exportSong = () => {
    if (props.uploadAudio === null) {
      alert('No file selected');
      return;
    }
    if (!songName.trim()) {
      alert('Please give the song name');
      return;
    }
    fetch(props.uploadAudio)
      .then((response) => response.blob())
      .then((blob) => {
        // console.log(blob);
        const formData = new FormData();
        const file = new File([blob], 'dummy.mp3');
        formData.append('name', songName);
        formData.append('file', file);
        formData.append('id', id);
        return axios.post('http://localhost:3000/upload', formData);
      })
      .then((res) => {
        alert('File Upload success');
      })
      .catch((err) => {
        alert('File Upload Error');
      });
  };

  return (
    <div className="export">
      <form className="export-form-ctr">
        <label className="export-form-label">
          Song name
          <input
            className="export-input"
            type="text"
            name="name"
            onChange={(e) => setSongName(e.target.value)}
          />
        </label>
      </form>
      <br />
      <button className="export-btn" onClick={(e) => exportSong(e)}>Export Song</button>
    </div>
  );
};

export default Export;
