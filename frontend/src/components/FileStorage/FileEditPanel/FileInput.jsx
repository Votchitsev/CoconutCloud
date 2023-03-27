import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import './FileInput.css';

function FileInput({ sendFile }) {
  const file = useRef();
  const [fileChosen, setFileChosen] = useState();

  const onChangeHandler = () => {
    setFileChosen(file.current.files);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setFileChosen();
    sendFile(fileChosen.item(0));
  };

  return (
    <form className="file-input-form" onSubmit={onSubmitHandler}>
      <div className="input-wrapper button">
        <label htmlFor="input_file">
          Add file
          <input type="file" id="input_file" ref={file} onChange={onChangeHandler} />
        </label>
        {/* <span>Add file</span> */}
        { fileChosen && fileChosen.length
          ? <span className="preview">{ fileChosen.item(0).name }</span>
          : null }
      </div>
      { fileChosen && fileChosen.length
        ? <input type="submit" value="send" />
        : null }
    </form>
  );
}

FileInput.propTypes = {
  sendFile: PropTypes.func.isRequired,
};

export default FileInput;