import React, { useRef } from 'react';

const Uploader = (props) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];

    if (file.size > 1024 * 1024) {
      props.onFileSelectError({ error: 'File size cannot exceed more than 1MB' });
    } else {
      props.onFileSelectSuccess(file);
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
    </div>
  );
};

export default Uploader;
