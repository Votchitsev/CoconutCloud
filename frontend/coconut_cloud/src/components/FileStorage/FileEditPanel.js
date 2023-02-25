import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import FileRenameForm from '../forms/fileRenameForm/_FileRenameForm'
import DeleteFileSubmitForm from '../forms/submitForm/SubmitForm'
import { downloadFile, getDownloadLink } from '../../api/requests'
import './FileEditPanel.css'
import ChangeCommentForm from '../forms/changeCommentForm/changeCommentForm'

function FileEditPanel ({ currentFile, setCurrentFile, setFiles }) {
  const [patchForm, setPatchForm] = useState()
  const token = useSelector(state => state.auth.authToken)

  const onClickHandler = (action) => {
    if (action === 'download') {
      const getLink = async () => {
        const response = await getDownloadLink(token, currentFile.id)
        const data = await response.json()

        const downloadResponse = await downloadFile(token, data.link)
        const downloadData = await downloadResponse.blob()

        const fileURL = window.URL.createObjectURL(downloadData)
        const link = document.createElement('a')
        link.href = fileURL
        link.download = currentFile.native_file_name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setCurrentFile()
      }

      getLink()
    }

    setPatchForm(action)
  }

  return (
    <>
      <div className='file-edit-panel'>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('rename')}>Rename</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('changeComment')}>Change comment</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('download')}>Download</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('delete')}>Delete</div>
      </div>
      { patchForm === 'rename' ? <FileRenameForm currentFile={ currentFile } token={ token } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
      { patchForm === 'changeComment' ? <ChangeCommentForm currentFile={ currentFile } token={ token } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
      { patchForm === 'delete' ? <DeleteFileSubmitForm currentFile={ currentFile } token={ token } setForm={ setPatchForm } setFiles={ setFiles } /> : null }
    </>
  )
}

FileEditPanel.propTypes = {
  currentFile: PropTypes.object,
  setCurrentFile: PropTypes.func,
  setFiles: PropTypes.func
}

export default FileEditPanel
