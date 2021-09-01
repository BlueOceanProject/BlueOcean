import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../App.jsx';

const Export = (props) => {
  // console.log(props.uploadAudio && props.uploadAudio.src);
  const [songName, setSongName] = useState('');
  const userContext = useContext(GlobalContext);
  const id = userContext.state.userId;

  const exportSong = () => {
    fetch(props.uploadAudio.src)
      .then(response => {
        // console.log(response);
        return response.blob();
      })
      .then(blob => {
        // console.log(blob);
        const formData = new FormData();
        var file = new File([blob], "dummy.mp3")
        formData.append("name", songName);
        formData.append("file", file);
        formData.append('id', id);
        return axios.post('http://localhost:3000/upload', formData)
      })
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => {
        alert("File Upload Error")
      });
  }

  return (
    <div className="export">
        <form>
          <label>Song name:
            <input type="text" name="name" onChange={(e) => setSongName(e.target.value)}/>
          </label>
        </form>
        <button onClick={e => exportSong(e)}>Export Song</button>
    </div>
  )
}

export default Export;