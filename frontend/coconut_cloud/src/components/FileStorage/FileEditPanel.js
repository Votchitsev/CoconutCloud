import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FileRenameForm from '../forms/fileRenameForm/_FileRenameForm'
import DeleteFileSubmitForm from '../forms/submitForm/SubmitForm'
import './FileEditPanel.css'
import ChangeCommentForm from '../forms/changeCommentForm/changeCommentForm'

function FileEditPanel ({ currentFile, setFiles }) {
  const [patchForm, setPatchForm] = useState()

  const onClickHandler = (action) => {
    setPatchForm(action)
  }

  return (
    <>
      <div className='file-edit-panel'>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('rename')}>Rename</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('changeComment')}>Change comment</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('delete')}>Delete</div>
      </div>
      { patchForm === 'rename' ? <FileRenameForm currentFile={ currentFile } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
      { patchForm === 'changeComment' ? <ChangeCommentForm currentFile={ currentFile } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
      { patchForm === 'delete' ? <DeleteFileSubmitForm currentFile={ currentFile } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
    </>
  )
}

FileEditPanel.propTypes = {
  currentFile: PropTypes.object,
  setFiles: PropTypes.func
}

export default FileEditPanel
