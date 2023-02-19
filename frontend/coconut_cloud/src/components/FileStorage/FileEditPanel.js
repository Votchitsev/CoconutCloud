import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FileRenameForm from '../forms/fileRenameForm/_FileRenameForm'
import './FileEditPanel.css'

function FileEditPanel ({ currentFile, setFiles }) {
  const [form, setForm] = useState()

  const onClickHandler = (action) => {
    setForm(action)
  }
  return (
    <>
      <div className='file-edit-panel'>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('rename')}>Rename</div>
        <div className='file-edit-panel--item'>Change comment</div>
        <div className='file-edit-panel--item'>Delete</div>
      </div>
      { form === 'rename' ? <FileRenameForm currentFile={ currentFile } setForm={ setForm } setFiles={ setFiles } /> : null }
    </>
  )
}

FileEditPanel.propTypes = {
  currentFile: PropTypes.object,
  setFiles: PropTypes.func
}

export default FileEditPanel
