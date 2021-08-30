import React, { useState } from 'react';
import axios from 'axios';

const Import = () => {

  const [file, setFile] = useState('');

  const uploadChange = (event) => {
    setFile(event.target.files[0])
  }

  const submitFile = (event) => {
    event.preventDefault();

  }

  return (
    <div className="import">
      <form onSubmit={submitFile}>
        <input id="fileItem" type="file" title="Upload" onChange={(e) => (uploadChange(e))}/>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={playHandler}>Play</button> */}
    </div>
  )
}

export default Import;