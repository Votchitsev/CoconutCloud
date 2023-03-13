import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FileRenameForm from './FileRenameForm'
import DeleteFileSubmitForm from './DeleteFileSubmitForm'
import GetLinkForm from './GetLinkForm'
import { downloadFile, getDownloadLink } from '../../../api/requests'
import './FileEditPanel.css'
import ChangeCommentForm from './ChangeCommentForm'
import BASE_URL from '../../../api/requests'

function FileEditPanel ({ currentFile, setCurrentFile, setFiles }) {
  const [patchForm, setPatchForm] = useState()
  const [downloadLink, setDownloadLink] = useState()

  const onClickHandler = (action) => {

    if (action === 'download') {
      const downloadFileHandler = async () => {
        const response = await getDownloadLink(currentFile.id)
        const data = await response.json()

        const downloadResponse = await downloadFile(data.link)
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

      downloadFileHandler()
    }

    if (action === 'getLink') {
      const getLink = async () => {
        const response = await getDownloadLink(currentFile.id)
        const data = await response.json()

        const link = `${BASE_URL}link/${data.link}/`
        setDownloadLink(link)
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
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('getLink')}>Get download link</div>
        <div className='file-edit-panel--item' onClick={ () => onClickHandler('delete')}>Delete</div>
      </div>
      { patchForm === 'rename'
      ? <FileRenameForm
          currentFile={ currentFile }
          setForm={ setPatchForm }
          setFiles={ setFiles } /> 
      : null }
      { patchForm === 'changeComment'
      ? <ChangeCommentForm 
        currentFile={ currentFile }
        setForm={ setPatchForm }
        setFiles={ setFiles } /> 
      : null }
      { patchForm === 'delete' 
      ? <DeleteFileSubmitForm
          currentFile={ currentFile }
          setForm={ setPatchForm }
          setFiles={ setFiles }
          setCurrentFile={ setCurrentFile } /> 
      : null }
      { patchForm === 'getLink' 
      ? <GetLinkForm
        link={ downloadLink }
        setForm={ setPatchForm } /> 
      : null }
    </>
  )
}

FileEditPanel.propTypes = {
  currentFile: PropTypes.object,
  setCurrentFile: PropTypes.func,
  setFiles: PropTypes.func
}

export default FileEditPanel
