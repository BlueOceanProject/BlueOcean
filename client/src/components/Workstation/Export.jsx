import React, { useState } from 'react';
import axios from 'axios';

const Export = (props) => {
  // console.log(props.uploadAudio && props.uploadAudio.src);
  const exportSong = () => {
    // console.log(props.uploadAudio.src)
    // axios.get(props.uploadAudio.src)
    //   .then(res => {
    //     console.log('ehwfiwefw', res);
    //     return res.data
    //   })
    //   .then(blob => {
    //     const formData = new FormData();
    //     // formData.append("name", 'sdfsdfsdfsdf' + Date.now());
    //     // formData.append("file", blob);
    //     var file = new File([blob], ".wav")
    //     formData.append("name", 'sdfsdfsdfsdf' + Date.now());
    //     formData.append("file", file)
    //     return axios.post('http://localhost:3000/upload', formData)
    //   })
    //   .then((res) => {
    //     alert("File Upload success");
    //   })
    //   .catch((err) => alert("File Upload Error"));
    fetch(props.uploadAudio.src)
      .then(response => {
        // console.log(response);
        return response.blob()
      })
      .then(blob => {
        // console.log(blob);
        const formData = new FormData();
        var file = new File([blob], "dummy.mp3")
        formData.append("name", 'sdfsdfsdfsdf' + Date.now());
        formData.append("file", file)
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
    <div>
        <button onClick={e => exportSong(e)}>Export Song</button>
    </div>
  )
}

export default Export;