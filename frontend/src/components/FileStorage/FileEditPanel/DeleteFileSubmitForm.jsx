import React from 'react';
import PropTypes from 'prop-types';
import { deleteFile } from '../../../api/requests';
import '../../formStyle/Form.css';
import img from '../../formStyle/icons8-close.svg';

function DeleteFileSubmitForm({
  currentFile, setForm, setFiles, setCurrentFile,
}) {
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await deleteFile(currentFile.id);
    const data = await response.json();

    if (response.ok) {
      setFiles(data);
      setCurrentFile();
      setForm();
    }
  };
  const onCloseHandler = () => {
    setForm();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2 className="form--title">Are you sure you want to delete the file?</h2>
      <input type="submit" value="Yes" required />
      <button className="close" onClick={() => {}} onKeyDown={onCloseHandler} type="button" aria-label="Close"><img src={img} alt="close" /></button>
      <div className="no" onClick={() => {}} onKeyDown={onCloseHandler} role="button" tabIndex={0}>No</div>
    </form>
  );
}

DeleteFileSubmitForm.propTypes = {
  currentFile: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
};

export default DeleteFileSubmitForm;
