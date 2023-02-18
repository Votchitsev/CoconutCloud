import React from 'react'
import { useSelector } from 'react-redux'
import FileInput from './FileInput'
import { postFile } from '../../api/requests'

function FileStorage () {
  const token = useSelector(state => state.auth.authToken)

  const sendFile = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('comment', '')

    postFile(token, formData)
  }

  return (
    <FileInput sendFile={sendFile} />
  )
}

export default FileStorage
